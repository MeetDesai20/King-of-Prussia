import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const bundleDir = path.join(root, "src", "assets", "map-source", "bundle");
const outDir = path.join(root, "src", "assets", "data");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const round = (n, d = 6) => Number(n.toFixed(d));

const mapMeta = readJson(path.join(bundleDir, "map.geojson"));
const nodeGeo = readJson(path.join(bundleDir, "node.geojson"));
const connections = readJson(path.join(bundleDir, "connection.json"));
const locations = readJson(path.join(bundleDir, "enterprise", "locations.json"));
const categories = readJson(path.join(bundleDir, "enterprise", "categories.json"));

const maps = mapMeta.map((m) => ({
  id: m.id,
  name: m.name,
  shortName: m.shortName,
  externalId: m.externalId,
}));

const mapToLevel = Object.fromEntries(maps.map((m) => [m.id, m.shortName]));

const spaceDir = path.join(bundleDir, "space");
const spaceFiles = fs.readdirSync(spaceDir).filter((f) => f.endsWith(".geojson"));

const floorBounds = {};
const floorPlans = {};
const spaceCenterById = {};

for (const file of spaceFiles) {
  const floorId = file.replace(".geojson", "");
  const level = mapToLevel[floorId] ?? floorId;
  const geo = readJson(path.join(spaceDir, file));

  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  const polys = [];

  for (const feature of geo.features) {
    const type = feature.geometry?.type;
    const coords = feature.geometry?.coordinates;
    if (!coords) continue;

    const rings = type === "Polygon" ? [coords[0]] : type === "MultiPolygon" ? coords.map((p) => p[0]) : [];
    for (const ring of rings) {
      const points = [];
      for (const [lon, lat] of ring) {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        points.push([lon, lat]);
      }
      polys.push({ id: feature.properties?.id, points });
    }

    const center = feature.properties?.center;
    if (center && Array.isArray(center) && center.length === 2) {
      spaceCenterById[feature.properties.id] = { lon: center[0], lat: center[1], level };
    }
  }

  floorBounds[level] = { minLon, maxLon, minLat, maxLat };
  floorPlans[level] = polys;
}

const normalizePoint = (level, lon, lat) => {
  const b = floorBounds[level];
  if (!b) return null;
  const x = (lon - b.minLon) / (b.maxLon - b.minLon || 1);
  const y = 1 - (lat - b.minLat) / (b.maxLat - b.minLat || 1);
  return [round(x), round(y)];
};

for (const [level, polys] of Object.entries(floorPlans)) {
  floorPlans[level] = polys.map((p) => ({
    id: p.id,
    points: p.points.map(([lon, lat]) => normalizePoint(level, lon, lat)),
  }));
}

const categoryByLocation = {};
for (const cat of categories) {
  for (const locId of cat.locations || []) {
    if (!categoryByLocation[locId]) {
      categoryByLocation[locId] = cat.name;
    }
  }
}

const nodeById = {};

for (const feature of nodeGeo.features) {
  const node = feature.properties;
  const [lon, lat] = feature.geometry.coordinates;
  const level = mapToLevel[node.map] ?? node.map;
  nodeById[node.id] = {
    id: node.id,
    mapId: node.map,
    floor: level,
    lon: round(lon, 8),
    lat: round(lat, 8),
    coordinates: normalizePoint(level, lon, lat),
    neighbors: (node.neighbors || []).map((n) => n.id),
  };
}

const listings = [];
for (const base of locations) {
  if (!base || base.hidden) continue;

  const placements = [];

  for (const nodeRef of base.nodes || []) {
    if (nodeRef?.map) placements.push({ mapId: nodeRef.map, nodeId: nodeRef.id, source: "node" });
  }

  for (const spaceRef of base.spaces || []) {
    if (spaceRef?.floor) placements.push({ mapId: spaceRef.floor, spaceId: spaceRef.id, source: "space" });
  }

  for (const polyRef of base.polygons || []) {
    if (polyRef?.map) placements.push({ mapId: polyRef.map, spaceId: polyRef.id, source: "polygon" });
  }

  const dedupe = new Set();
  const uniqPlacements = [];
  for (const p of placements) {
    const key = `${p.mapId}|${p.nodeId || ""}|${p.spaceId || ""}`;
    if (!dedupe.has(key)) {
      dedupe.add(key);
      uniqPlacements.push(p);
    }
  }

  for (const p of uniqPlacements) {
    const level = mapToLevel[p.mapId] ?? p.mapId;
    if (!floorBounds[level]) continue;

    const node = p.nodeId ? nodeById[p.nodeId] : null;
    const spaceCenter = p.spaceId ? spaceCenterById[p.spaceId] : null;

    let coordinates = node?.coordinates || null;
    if (!coordinates && spaceCenter) {
      coordinates = normalizePoint(level, spaceCenter.lon, spaceCenter.lat);
    }

    if (!coordinates) continue;

    listings.push({
      id: `${base.id}_${p.mapId}_${p.nodeId || p.spaceId || "placement"}`,
      locationId: base.id,
      externalId: base.externalId,
      name: base.name,
      type: base.type,
      category: categoryByLocation[base.id] || base.type || "Other",
      floor: level,
      mapId: p.mapId,
      coordinates,
      nodeId: p.nodeId || null,
      description: base.description || "",
    });
  }
}

const uniqueListings = [];
const seen = new Set();
for (const row of listings) {
  const key = `${row.name}|${row.floor}|${row.nodeId}`;
  if (seen.has(key)) continue;
  seen.add(key);
  uniqueListings.push(row);
}

const edgeMap = new Map();
const edgeKey = (a, b) => (a < b ? `${a}__${b}` : `${b}__${a}`);

const distance = (a, b) => {
  if (!a || !b || !a.coordinates || !b.coordinates) return 1;
  const dx = a.coordinates[0] - b.coordinates[0];
  const dy = a.coordinates[1] - b.coordinates[1];
  return Math.sqrt(dx * dx + dy * dy);
};

for (const node of Object.values(nodeById)) {
  for (const nb of node.neighbors) {
    if (!nodeById[nb]) continue;
    const key = edgeKey(node.id, nb);
    if (edgeMap.has(key)) continue;
    edgeMap.set(key, {
      from: node.id,
      to: nb,
      type: "walk",
      weight: round(distance(node, nodeById[nb]), 8),
    });
  }
}

for (const conn of connections) {
  const [a, b] = conn.nodes || [];
  if (!a || !b || !nodeById[a] || !nodeById[b]) continue;
  const key = edgeKey(a, b);
  if (edgeMap.has(key)) continue;
  edgeMap.set(key, {
    from: a,
    to: b,
    type: conn.type || "connector",
    weight: round(distance(nodeById[a], nodeById[b]) + 0.35, 8),
    accessible: !!conn.accessible,
  });
}

const navigation = {
  nodes: Object.values(nodeById).map((n) => ({
    id: n.id,
    mapId: n.mapId,
    floor: n.floor,
    coordinates: n.coordinates,
  })),
  edges: Array.from(edgeMap.values()),
};

const floors = maps.map((m) => ({
  id: m.id,
  name: m.name,
  shortName: m.shortName,
  bounds: floorBounds[m.shortName],
}));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "mallDirectory.json"), JSON.stringify(uniqueListings, null, 2));
fs.writeFileSync(path.join(outDir, "mallFloorPlans.json"), JSON.stringify({ floors, floorPlans }, null, 2));
fs.writeFileSync(path.join(outDir, "mallNavigation.json"), JSON.stringify(navigation, null, 2));

console.log(`Generated mallDirectory.json (${uniqueListings.length} listings)`);
console.log(`Generated mallFloorPlans.json (${Object.values(floorPlans).reduce((a,b)=>a+b.length,0)} polygons)`);
console.log(`Generated mallNavigation.json (${navigation.nodes.length} nodes / ${navigation.edges.length} edges)`);

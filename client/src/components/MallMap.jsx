import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneShop } from "react-icons/ai";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import directoryData from "../assets/data/mallDirectory.json";
import floorPlanData from "../assets/data/mallFloorPlans.json";
import navigationData from "../assets/data/mallNavigation.json";
import "../assets/css/MallMap.css";
import { FaAngleLeft } from "react-icons/fa";

const MAP_WIDTH = 1400;
const MAP_HEIGHT = 820;

const FLOOR_CONFIG = floorPlanData.floors.reduce((acc, floor) => {
    const tint = floor.shortName === "UL" ? "#f6f0df" : floor.shortName === "ML" ? "#f2f5f1" : "#edf2f7";
    acc[floor.shortName] = {
        label: floor.shortName,
        name: floor.name,
        tint,
        mapId: floor.id,
    };
    return acc;
}, {});

const TABS = ["Popular", "Amenities", "Deals"];

const FLOOR_ORDER = ["UL", "ML", "LL"];

function dijkstra(startId, endId, adjacency) {
    if (!startId || !endId || startId === endId) {
        return startId && endId ? [startId] : [];
    }

    const dist = new Map([[startId, 0]]);
    const prev = new Map();
    const queue = new Set([startId]);

    while (queue.size > 0) {
        let current = null;
        let currentDist = Infinity;

        for (const node of queue) {
            const d = dist.get(node) ?? Infinity;
            if (d < currentDist) {
                currentDist = d;
                current = node;
            }
        }

        if (!current) break;
        queue.delete(current);
        if (current === endId) break;

        const neighbors = adjacency.get(current) || [];
        for (const edge of neighbors) {
            const next = edge.to;
            const alt = currentDist + edge.weight;
            if (alt < (dist.get(next) ?? Infinity)) {
                dist.set(next, alt);
                prev.set(next, current);
                queue.add(next);
            }
        }
    }

    if (!prev.has(endId) && startId !== endId) {
        return [];
    }

    const path = [endId];
    let node = endId;
    while (prev.has(node)) {
        node = prev.get(node);
        path.unshift(node);
    }
    return path;
}

export default function MallMap() {

    const navigate = useNavigate()
    const location = useLocation();
    const wrapperRef = useRef(null);
    const [selectedFloor, setSelectedFloor] = useState("UL");
    const [selectedTab, setSelectedTab] = useState("Popular");
    const [search, setSearch] = useState("");
    const [selectedStore, setSelectedStore] = useState(null);
    const [routeStartId, setRouteStartId] = useState("");
    const [routeEndId, setRouteEndId] = useState("")

    const allListings = useMemo(() => {
        const seen = new Set();
        const rows = [];
        for (const item of directoryData) {
            const key = `${item.locationId}|${item.floor}`;
            if (seen.has(key)) continue;
            seen.add(key);
            rows.push(item);
        }
        return rows;
    }, []);

    const floorPolygons = floorPlanData.floorPlans[selectedFloor] || [];

    const nodeById = useMemo(() => {
        return Object.fromEntries(navigationData.nodes.map((node) => [node.id, node]));
    }, []);

    const adjacency = useMemo(() => {
        const map = new Map();
        for (const edge of navigationData.edges) {
            if (!map.has(edge.from)) map.set(edge.from, []);
            if (!map.has(edge.to)) map.set(edge.to, []);
            map.get(edge.from).push({ to: edge.to, weight: edge.weight, type: edge.type });
            map.get(edge.to).push({ to: edge.from, weight: edge.weight, type: edge.type });
        }
        return map;
    }, []);

    const floorStores = useMemo(
        () => allListings.filter((store) => store.floor === selectedFloor),
        [allListings, selectedFloor]
    );

    const filteredStores = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        if (!normalized) {
            return floorStores;
        }

        const rows = floorStores.filter((store) => {
            return (
                store.name.toLowerCase().includes(normalized) ||
                store.category.toLowerCase().includes(normalized)
            );
        });
        return rows;
    }, [floorStores, search]);

    const popularStores = useMemo(() => {
        return floorStores.slice(0, 7);
    }, [floorStores]);

    const dealStores = useMemo(() => {
        return floorStores.slice(0, 4).map((store, index) => ({
            ...store,
            offer: ["10% Off", "Buy 1 Get 1", "Member Perk", "New Arrival"][index],
        }));
    }, [floorStores]);

    const amenities = useMemo(() => {
        return allListings
            .filter((item) => item.type === "amenity")
            .slice(0, 12)
            .map((item) => ({ id: item.id, name: item.name, level: item.floor }));
    }, [allListings]);

    const nearestNodeId = useCallback((store) => {
        if (store?.nodeId && nodeById[store.nodeId]) return store.nodeId;

        let best = null;
        let minDist = Infinity;
        for (const node of navigationData.nodes) {
            if (node.floor !== store.floor || !node.coordinates) continue;
            const dx = node.coordinates[0] - store.coordinates[0];
            const dy = node.coordinates[1] - store.coordinates[1];
            const d = dx * dx + dy * dy;
            if (d < minDist) {
                minDist = d;
                best = node.id;
            }
        }
        return best;
    }, [nodeById]);

    const routePath = useMemo(() => {
        const from = allListings.find((x) => x.id === routeStartId);
        const to = allListings.find((x) => x.id === routeEndId);
        if (!from || !to) return [];

        const startNode = nearestNodeId(from);
        const endNode = nearestNodeId(to);
        const routeNodeIds = dijkstra(startNode, endNode, adjacency);

        return routeNodeIds
            .map((id) => nodeById[id])
            .filter((node) => node && node.floor === selectedFloor && node.coordinates)
            .map((node) => node.coordinates);
    }, [routeStartId, routeEndId, selectedFloor, allListings, adjacency, nodeById, nearestNodeId]);

    const routeEndpointStores = useMemo(() => {
        const selectedIds = new Set([routeStartId, routeEndId].filter(Boolean));
        if (selectedIds.size === 0) return [];
        return allListings.filter((store) => selectedIds.has(store.id));
    }, [allListings, routeStartId, routeEndId]);

    const showRouteSelection = routeEndpointStores.length > 0;

    const focusStore = (store) => {
        setSelectedFloor(store.floor);
        setSelectedStore(store);

        const x = store.coordinates[0] * MAP_WIDTH;
        const y = store.coordinates[1] * MAP_HEIGHT;
        const scale = 2.2;
        const centerX = window.innerWidth * 0.29;
        const centerY = window.innerHeight * 0.52;
        const positionX = centerX - x * scale;
        const positionY = centerY - y * scale;

        wrapperRef.current?.setTransform(positionX, positionY, scale, 400, "easeOut");
    };

    const mapTint = FLOOR_CONFIG[selectedFloor].tint;

    useEffect(() => {
        // Reset scroll to top on page mount
        window.scrollTo({ top: 0 });
    }, []);

    useEffect(() => {
        const selectedStoreName = location.state?.selectedStoreName;
        if (!selectedStoreName) return;

        const normalizedTarget = selectedStoreName.trim().toLowerCase();
        const matchedStore = allListings.find((store) => store.name.trim().toLowerCase() === normalizedTarget);

        if (matchedStore) {
            focusStore(matchedStore);
        }
    }, [allListings, location.state]);

    return (
        <div className="kop-map-page">
            <button style={{ display: 'flex' }} onClick={()=>navigate('/home')}>
                <FaAngleLeft style={{ margin: '5px 0 0' }} /> Back
            </button>

            <header className="kop-map-header">
                <h1>Interactive Map for King of Prussia</h1>
                <p>Find stores, jump to floors, and explore the center map.</p>
            </header>

            <section className="kop-map-shell" aria-label="King of Prussia interactive map">
                <aside className="kop-panel">
                    <div className="kop-search-wrap">
                        <input
                            type="search"
                            className="kop-search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search stores or categories"
                            aria-label="Search stores"
                        />
                    </div>

                    <div className="kop-tabs" role="tablist" aria-label="Map categories">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                role="tab"
                                aria-selected={selectedTab === tab}
                                className={`kop-tab ${selectedTab === tab ? "is-active" : ""}`}
                                onClick={() => setSelectedTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="kop-list" role="tabpanel" aria-label={selectedTab}>
                        {selectedTab === "Popular" &&
                            popularStores.map((store) => (
                                <button
                                    key={store.id}
                                    type="button"
                                    className="kop-list-item"
                                    onClick={() => focusStore(store)}
                                >
                                    <strong>{store.name}</strong>
                                    <span>{FLOOR_CONFIG[store.floor].name}</span>
                                </button>
                            ))}

                        {selectedTab === "Amenities" &&
                            amenities.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="kop-list-item"
                                    onClick={() => setSelectedFloor(item.level)}
                                >
                                    <strong>{item.name}</strong>
                                    <span>{FLOOR_CONFIG[item.level].name}</span>
                                </button>
                            ))}

                        {selectedTab === "Deals" &&
                            dealStores.map((store) => (
                                <button
                                    key={store.id}
                                    type="button"
                                    className="kop-list-item"
                                    onClick={() => focusStore(store)}
                                >
                                    <strong>{store.name}</strong>
                                    <span>{store.offer}</span>
                                </button>
                            ))}
                    </div>

                    <div className="kop-results">
                        <p>
                            {filteredStores.length} results on {FLOOR_CONFIG[selectedFloor].name}
                        </p>
                        <div className="kop-chip-wrap">
                            {filteredStores.slice(0, 12).map((store) => (
                                <button
                                    key={store.id}
                                    type="button"
                                    className="kop-chip"
                                    onClick={() => focusStore(store)}
                                >
                                    {store.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="kop-map-area" style={{cursor:'-webkit-grab'}}>
                    <nav className="kop-floor-switch" aria-label="Floor selector">
                        {FLOOR_ORDER.map((floorKey) => FLOOR_CONFIG[floorKey]).filter(Boolean).map((floor) => (
                            <button
                                key={floor.label}
                                type="button"
                                className={`kop-floor-btn ${selectedFloor === floor.label ? "is-active" : ""}`}
                                onClick={() => {
                                    setSelectedFloor(floor.label);
                                    setSelectedStore(null);
                                }}
                            >
                                {floor.label}
                            </button>
                        ))}
                    </nav>

                    <TransformWrapper
                        ref={wrapperRef}
                        minScale={1}
                        maxScale={5}
                        initialScale={1}
                        wheel={{ step: 0.12 }}
                        doubleClick={{ disabled: true }}
                        limitToBounds={false}
                    >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                                <div className="kop-zoom-controls" aria-label="Map zoom controls">
                                    <button type="button" onClick={() => zoomIn()}>+</button>
                                    <button type="button" onClick={() => zoomOut()}>-</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRouteStartId("");
                                            setRouteEndId("");
                                            setSelectedStore(null);
                                            resetTransform();
                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>

                                <TransformComponent wrapperClass="kop-transform-wrapper" contentClass="kop-transform-content">
                                    <svg
                                        className="kop-floor-svg"
                                        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                                        role="img"
                                        aria-label={`${FLOOR_CONFIG[selectedFloor].name} floor map`}
                                    >
                                        <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill={mapTint} />

                                        {floorPolygons.map((poly) => {
                                            if (!poly.points || poly.points.length < 3) return null;
                                            const d = poly.points
                                                .map((pt, idx) => `${idx === 0 ? "M" : "L"} ${pt[0] * MAP_WIDTH} ${pt[1] * MAP_HEIGHT}`)
                                                .join(" ");

                                            return (
                                                <path
                                                    key={poly.id}
                                                    d={`${d} Z`}
                                                    className="kop-space"
                                                />
                                            );
                                        })}

                                        {routePath.length > 1 && (
                                            <polyline
                                                points={routePath
                                                    .map((p) => `${p[0] * MAP_WIDTH},${p[1] * MAP_HEIGHT}`)
                                                    .join(" ")}
                                                className="kop-route-line"
                                            />
                                        )}

                                        {(selectedStore
                                            ? [selectedStore]
                                            : showRouteSelection
                                                ? routeEndpointStores
                                                : floorStores
                                        ).map((store) => {
                                            const cx = store.coordinates[0] * MAP_WIDTH;
                                            const cy = store.coordinates[1] * MAP_HEIGHT;
                                            const isActive = selectedStore?.id === store.id;

                                            return (
                                                <g key={store.id}>
                                                    <foreignObject x={cx - 16} y={cy - 16} width="32" height="32">
                                                        <div className={`kop-shop-marker ${isActive ? "is-active" : ""}`} onClick={() => setSelectedStore(store)}>
                                                            <AiTwotoneShop />
                                                        </div>
                                                    </foreignObject>
                                                    {isActive && (
                                                        <text x={cx + 20} y={cy + 5} className="kop-store-label">
                                                            {store.name}
                                                        </text>
                                                    )}
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>

                    {selectedStore && (
                        <article className="kop-store-card" aria-live="polite">
                            <div className="kop-store-card-header">
                                <h2>{selectedStore.name}</h2>
                                <button
                                    type="button"
                                    className="kop-store-card-close"
                                    onClick={() => setSelectedStore(null)}
                                    aria-label="Clear selected store"
                                >
                                    ×
                                </button>
                            </div>
                            <p>{selectedStore.category}</p>
                            <small>{selectedStore.description}</small>
                        </article>
                    )}

                    <article className="kop-route-card" aria-live="polite">
                        <h3>Route Finder</h3>
                        <div className="kop-route-controls">
                            <select value={routeStartId} onChange={(e) => setRouteStartId(e.target.value)}>
                                <option value="">Start store</option>
                                {allListings.map((store) => (
                                    <option key={`start-${store.id}`} value={store.id}>
                                        {store.name} ({store.floor})
                                    </option>
                                ))}
                            </select>
                            <select value={routeEndId} onChange={(e) => setRouteEndId(e.target.value)}>
                                <option value="">Destination store</option>
                                {allListings.map((store) => (
                                    <option key={`end-${store.id}`} value={store.id}>
                                        {store.name} ({store.floor})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <small>
                            {routePath.length > 1
                                ? `Route drawn on ${FLOOR_CONFIG[selectedFloor].name}.`
                                : "Select start and destination to draw a route."}
                        </small>
                    </article>
                </div>
            </section>
        </div>
    );
}
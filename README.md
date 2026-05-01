# King of Prussia 

An interactive web experience for exploring retail, luxury, dining, entertainment, events, and map/navigation data for King of Prussia.

## Tech Stack

- Frontend framework: React 19
- Routing: react-router-dom
- Styling: Tailwind CSS + custom CSS
- Animation: framer-motion
- Mapping: mapbox-gl + react-map-gl
- State management: zustand
- Build tooling: Create React App (react-scripts 5)
- Testing utilities: React Testing Library + Jest DOM

## Setup Instructions

### Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

### Install

```bash
npm install
```

### Run in development

```bash
npm start
```

App runs at:

http://localhost:3000

### Build for production

```bash
npm run build
```

Production output is generated in the `build` directory.

### Run tests

```bash
npm test
```

## Project Structure (High Level)

- `src/pages`: route-level screens such as Intro and Home
- `src/sections`: homepage content sections (retail, luxury, events, etc.)
- `src/components`: shared UI elements and map-related components
- `src/assets`: media assets and map data bundles
- `scripts`: utility scripts for data/build workflows

## Design Decisions

- Hash-based routing was used for simple static hosting compatibility.
- Heavy routes/components are lazy-loaded to improve initial load performance.
- Reusable section/component architecture keeps marketing sections modular.
- IntersectionObserver-based media loading helps defer offscreen images/video.
- Mixed Tailwind utilities and targeted CSS files balance speed and control.
- SEO metadata is managed in-app for route-specific titles and social tags.

## AI Tools Used

- Google Stitch: used for ideation and UI/UX direction exploration.
- ChatGPT: used for code generation support, debugging guidance, and documentation drafting.
- Cloud tools/services: used for collaboration workflows, asset handling, and deployment support.

## Notes

- If Lighthouse flags console issues, verify route metadata and third-party package warnings first.
- If deploying to a subpath, configure `homepage` in `package.json` accordingly.

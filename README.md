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

## Digital Deck Conversion

This repository now presents the main marketing experience as a slide-style "digital deck" rather than a single scroll page. The deck keeps the original content and layout components but wraps them in a presentation flow for guided sales or investor walkthroughs.

- Default route: the app root (`/`) now opens the slide deck (presentation) directly.
- The map route (`/map`) is preserved and behaves the same as before.
- Full-screen slides: each section is presented as a snap-aligned slide.
- Keyboard navigation: use Arrow keys, PageUp/PageDown, Home/End to move through slides.
- Mobile controls: a bottom rail and a right-side slide navigator provide quick access on small screens.

Changed files (primary):

- [client/src/pages/Home.jsx](client/src/pages/Home.jsx)
- [client/src/App.js](client/src/App.js)
- [client/src/components/SectionWrapper.jsx](client/src/components/SectionWrapper.jsx)
- [client/src/sections/CTASection.jsx](client/src/sections/CTASection.jsx)
- [client/src/index.css](client/src/index.css)

How to edit slides

- Slide order and slide components are defined in `client/src/pages/Home.jsx` inside the `slides` array. To change order or add/remove slides, edit that array and update the `label` and `node` values.
- The cover slide is implemented as a React component (`CoverSlide`) in the same file; update copy or buttons there to change the opening behavior.

Run & build notes

Prereqs: Node.js 18+ and npm 9+ are recommended.

Install and run locally:

```bash
cd client
npm install
npm start
```

Build for production:

```bash
cd client
npm run build
```

Notes from local validation

- I validated the conversion with a production build (`npm run build`). The build completed successfully.
- You may see parse/source-map warnings related to files under `node_modules`; these come from upstream packages' source maps and were present before the deck changes. They do not prevent the build from producing a working `build/` output.

Tips & next steps

- To customize slide controls (timing, keyboard mapping, or add presenter notes), update `client/src/pages/Home.jsx` and add new controls or metadata to the slide objects.
- To revert temporarily to the original scroll-based homepage, restore the previous route in `client/src/App.js` (the original Intro/Home mapping is present in Git history).

If you want, I can also:

- Re-order slides and update copy to match a provided digideck script or uploaded slide file.
- Generate a compact export (PDF/screenshots) of each slide for offline sharing.


## AI Tools Used

- Google Stitch: used for ideation and UI/UX direction exploration.
- ChatGPT: used for code generation support, debugging guidance, and documentation drafting.
- Cloud tools/services: used for collaboration workflows, asset handling, and deployment support.

## Notes

- If Lighthouse flags console issues, verify route metadata and third-party package warnings first.
- If deploying to a subpath, configure `homepage` in `package.json` accordingly.

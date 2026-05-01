import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Intro from './pages/Intro';

// Lazy load heavy components to reduce initial bundle
const Home = lazy(() => import('./pages/Home'));
const MallMap = lazy(() => import('./components/MallMap'));

// Loading fallback for lazy-loaded routes
const RouteLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    fontSize: '1.1rem',
    color: '#666'
  }}>
    Loading...
  </div>
);

function App() {
  useEffect(() => {
    // Disable browser scroll restoration to prevent jumping to previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={
          <Suspense fallback={<RouteLoader />}>
            <Home />
          </Suspense>
        } />
        <Route path='/map' element={
          <Suspense fallback={<RouteLoader />}>
            <MallMap />
          </Suspense>
        } />
      </Routes> 
    </>
  );
}

export default App;

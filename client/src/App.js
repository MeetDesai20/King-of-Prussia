import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Intro from './pages/Intro';
import Home from './pages/Home';
import MallMap from './components/MallMap';

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
        <Route path='/home' element={<Home />} />
        <Route path='/map' element={<MallMap />} />
      </Routes> 
    </>
  );
}

export default App;

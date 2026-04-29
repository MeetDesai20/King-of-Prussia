import './App.css';
import { Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home'
import Map from './pages/Map';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Intro />} />
        <Route path='/home' element={<Home />} />
        <Route path='/map' element={<Map />} />
      </Routes> 
    </>
  );
}

export default App;

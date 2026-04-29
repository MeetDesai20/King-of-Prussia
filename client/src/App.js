import './App.css';
import { Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro';
import Home from './pages/Home';
import MallMap from './components/MallMap';

function App() {
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

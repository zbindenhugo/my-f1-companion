import './App.css';
import Navigation from './navigation/Navigation';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import Preloader from './pages/Preloader';

function App() {
  return (
    <>
      {window.location.pathname === '/' ? null : <Navigation />}
      <Routes>
        <Route path='/' element={<Preloader />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

import './App.css';
import Navigation from './navigation/Navigation';
import Home from './pages/Home';

import { Routes, Route } from 'react-router-dom';
import Preloader from './pages/Preloader';
import Season from './pages/Seasons/Season';

import { UserProvider } from './contexts/Contexts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RaceResult from './pages/races/RaceResult';
import RaceInfos from './pages/races/RaceInfos';

function App() {

  return (
    <UserProvider>
      {window.location.pathname === '/' ? null : <Navigation />}
      <Routes>
        <Route path='/' element={<Preloader />} />
        <Route path='/home' element={<Home />} />
        <Route path='seasons'>
          <Route path=':year' element={<Season />} />
          <Route path=':year/:round/results' element={<RaceResult />} />
          <Route path=':year/:round/infos' element={<RaceInfos />} />
        </Route>
      </Routes>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;

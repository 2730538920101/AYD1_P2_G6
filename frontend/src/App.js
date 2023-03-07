import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

import Login from './components/VISTAS/Login/Login';
import Registro from './components/VISTAS/Login/Registro'; 
import InfoActor from './components/VISTAS/User/InfoActor';
import InfoPeli from './components/VISTAS/User/InfoPeli';
import NuevaPelicula from './components/VISTAS/Administrador/NuevaPelicula';
import NuevoActor from './components/VISTAS/Administrador/NuevoActor';
import Peliculas from './components/VISTAS/User/Peliculas';
import WatchList from './components/VISTAS/User/WatchList';


function App() {
  return (
    <Router>      
      <Routes>
        <Route path={'/'} element={<Login/>} /> 
        <Route path={'/Registro'} element={<Registro/>} />  
        <Route path={'/infoActor'} element={<InfoActor/>} />
        <Route path={'/infoPeli'} element={<InfoPeli/>} />
        <Route path={'/NuevaPelicula'} element={<NuevaPelicula/>} />
        <Route path={'/NuevoActor'} element={<NuevoActor/>} />
        <Route path={'/Peliculas'} element={<Peliculas/>} />
        <Route path={'/WatchList'} element={<WatchList/>} />
        <Route path={'/InfoPeli'} element={<InfoPeli/>} />
        <Route path={'/InfoActor'} element={<InfoActor/>} />
      </Routes>

    </Router> 
  );
}

export default App;

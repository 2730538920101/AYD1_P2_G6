<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/VISTAS/Login/Login";
import Registro from "./components/VISTAS/Login/Registro";
import InfoActor from "./components/VISTAS/User/InfoActor";
import Movie from "./components/movie/Movie"
import NuevaPelicula from "./components/VISTAS/Administrador/NuevaPelicula";
import NuevoActor from "./components/VISTAS/Administrador/NuevoActor";
import Peliculas from "./components/VISTAS/User/Peliculas";
import WatchList from "./components/VISTAS/User/WatchList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Login />} />
        <Route path={"/Registro"} element={<Registro />} />
        <Route path={"/infoActor/:id"} element={<InfoActor />} />
        <Route path={"/infoPeli/:id"} element={<Movie />} />
        <Route path={"/NuevaPelicula"} element={<NuevaPelicula />} />
        <Route path={"/NuevoActor"} element={<NuevoActor />} />
        <Route path={"/Peliculas"} element={<Peliculas />} />
        <Route path={"/WatchList"} element={<WatchList />} />
      </Routes>
    </Router>
>>>>>>> 1.0.0
  );
}

export default App;

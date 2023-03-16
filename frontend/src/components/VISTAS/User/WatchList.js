import React from 'react'
import NavbarU from '../../Navbars/NavbarU'
import useGetWatchlist from "../../../hooks/get-watchlist/useGetWatchlist"; 
import { Spinner, Button, Container, Card } from "react-bootstrap";
import Carta from './Carta'

function WatchList() {
  const user = localStorage.getItem("usuario");
  const [status, error, data] = useGetWatchlist(user);

  if (status !== "ok") {
    return (
      <Spinner
        animation="border"
        role="status"
        className="flex flex-col align-items-center justify-center"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  

  return (
    <>
      <NavbarU />
      <br />
      <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map((item) => (
          <Carta 
              idW = {item.id_wl}
              video={item.trailer} 
              titulo={item.nombre_pelicula}
              id={item.id_pelicula}
              fecha = {item.fecha}
          />
        ))}



      </Container>



    </>
  )
}

export default WatchList
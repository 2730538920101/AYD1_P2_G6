import React from 'react'
import NavbarU from '../../Navbars/NavbarU'
import { Link, useParams } from "react-router-dom";
import GetActor from "../../../hooks/get-actor/GetActor.js";
import { Alert, FloatingLabel, Form, Spinner, Container, ListGroup, Card } from "react-bootstrap";
import GetMovies from "../../../hooks/get-movies/useGetMovies";

function InfoActor() {
  const params = useParams();
  const [status, error, data] = GetActor(params.id);
  const [status2, error2, data2] = GetMovies(params.id);


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

  if (error !== undefined) {
    return (
      <Alert show={true} variant="danger" dismissible className="p-2">
        <Alert.Heading>Error inesperado x(</Alert.Heading>
        <p>
          Ha ocurrido un error inesperado en la recuperacion de los datos del
          servidor
        </p>
      </Alert>
    );
  }

  const renderPeliculas = () => {
    if (data2.length > 0) {
      return data2.map(
        (item, index) =>
          index < 5 && (
            <li key={item.PEL_ID} className="inline">
              <Link to={`/infoPeli/${item.PEL_ID}`} style={{ fontSize: '20px', color: "white" }}>{item.NOMBRE}</Link>
            </li>
          )
      );
    }

    return null;
  };

  return (
    <>
      <NavbarU />
      <br></br>
      <Container>
        <h1 style={{ color: 'white' }}>Información de {data.NOMBRE}</h1>
        <div className="grid grid-cols-2 grid-rows-1 g-3 p-2">
          <div className="justify-items-start w-full">
            <Form.Group className="p-3 w-auto" controlId="name">
              <FloatingLabel controlId="name" label="Nombre" className="mb-3">
                <Form.Control
                  type="text"
                  disabled
                  value={data.NOMBRE ? data.NOMBRE : ""}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="p-3 w-auto" controlId="name">
              <FloatingLabel controlId="name" label="Fecha Nacimiento" className="mb-3">
                <Form.Control
                  type="text"
                  disabled
                  value={data.FECHA_NACIMIENTO ? data.FECHA_NACIMIENTO : ""}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="p-3 w-auto" controlId="name">
              <FloatingLabel controlId="name" label="Descripción" className="mb-3">
                <Form.Control
                  type="text"
                  as="textarea"
                  disabled
                  value={data.DESCRIPCION ? data.DESCRIPCION : ""}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="p-3 w-auto" controlId="name">
              <div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Últimas películas en las que ha trabajado</h3>
                <div className="flex justify-center h-8">
                  <ul className="inline-block space-x-4">{renderPeliculas()}</ul>
                </div>
              </div>
            </Form.Group>
          </div>
          <div className="flex align-items-start justify-center w-full">
            <img style={{ width: "50%", height: "100%" }}
              className="max-w-none w-96 flex justify-center align-items-center"
              src={data.FOTO}
              alt="no-image"
            />
          </div>


        </div>

      </Container>

    </>

  )
}

export default InfoActor
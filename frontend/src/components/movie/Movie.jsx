import { useState } from "react";
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useGetMovie from "../../hooks/get-movie/useGetMovie";
import useGetComments from "../../hooks/get-comments/useGetComments";
import NavbarU from "../Navbars/NavbarU";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

import API_URL from "../../app/constants";
const Movie = () => {
  const params = useParams();
  const [status, error, movie] = useGetMovie(params.id);
  const [statusComments, errorComments, coments] = useGetComments(params.id);
  const [rateValue, setRateValue] = useState(-1);

  if (status !== "ok" && statusComments !== "ok") {
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

  if (error !== undefined && errorComments !== undefined) {
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

  const renderReparto = () => {
    if (movie) {
      return movie.REPARTO.map(
        (item, index) =>
          index < 5 && (
            <li key={item.ACT_ID} className="inline">
              <Link
                to={`/infoActor/${item.ACT_ID}`}
                style={{ fontSize: "20px", color: "white" }}
              >
                {item.NOMBRE}
              </Link>
            </li>
          )
      );
    }

    return null;
  };

  const handleOnComment = async() => {
    await fetch(`${API_URL}/agregarComentario`, {
      method: "POST",
      body: {
        id_usuario: "",
        id_pelicula: "",
        descripcion: ""
      },
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {

      })
      .catch((error) => {
        console.log(error)
      });

  }

  return (
    <>
      <NavbarU />
      <div className="grid grid-cols-2 grid-rows-1 g-3 p-2">
        <div className="justify-items-start w-full">
          <Form.Group className="p-3 w-auto" controlId="name">
            <FloatingLabel controlId="name" label="Nombre" className="mb-3">
              <Form.Control
                type="text"
                disabled
                value={movie.NOMBRE ? movie.NOMBRE : ""}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="p-3 w-auto" controlId="name">
            <FloatingLabel controlId="name" label="Director" className="mb-3">
              <Form.Control
                type="text"
                disabled
                value={movie.DIRECTOR ? movie.DIRECTOR : ""}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="p-3 w-auto" controlId="name">
            <FloatingLabel
              controlId="name"
              label="Fecha de Estreno"
              className="mb-3"
            >
              <Form.Control
                type="text"
                disabled
                value={movie.FECHA_ESTRENO ? new Date(movie.FECHA_ESTRENO).toLocaleDateString("en-US") : ""}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="p-3 w-auto" controlId="name">
            <FloatingLabel controlId="name" label="Resumen" className="mb-3">
              <Form.Control
                type="text"
                as="textarea"
                disabled
                value={movie.RESUMEN ? movie.RESUMEN : ""}
              />
            </FloatingLabel>
          </Form.Group>
        </div>
        <div className="flex align-items-start justify-center w-full">
          <img
            className="max-w-none w-96 flex justify-center align-items-center"
            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            alt="no-image"
          />
        </div>
        <div className="flex justify-center h-8">
          <ul className="inline-block space-x-4">{renderReparto()}</ul>
        </div>
        <div className="flex align-items-start justify-center h-8">
          <Rating
            name="disabled"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => setRateValue(newValue)}
          />
        </div>
      </div>
      <div className="mt-3 p-2 w-full rounded-md ml-5">
        <h2 style={{ color: "white" }}>Deja un comentario</h2>
        <div style={{ width: "50%", border: "none", borderRadius: "10px" }}>
          <TextField
            sx={{
              width: "100%",
              padding: "2",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            id="outlined-multiline-flexible"
            label="Deja tu comentario"
            variant="filled"
            multiline
            rows={3}
          />
          <Button className="flex flex-col ml-auto " onClick={handleOnComment}>Comentar</Button>
        </div>
      </div>
    </>
  );
};

export default Movie;

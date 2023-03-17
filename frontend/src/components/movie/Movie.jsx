import { useEffect, useState } from "react";
import { Alert, Button, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useGetMovie from "../../hooks/get-movie/useGetMovie";
import NavbarU from "../Navbars/NavbarU";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

import API_URL from "../../app/constants";
import ShowComments from "../show-comments/ShowComments";
import useGetRateValue from "../../hooks/get-rateValue/useGetRateValue";
const Movie = () => {
  const params = useParams();
  const user = localStorage.getItem("usuario");
  const [status, error, movie] = useGetMovie(params.id);
  const [statusRate, errorRate, rate] = useGetRateValue(user, params.id);
  const [comments, setComments] = useState([]);
  const [rateValue, setRateValue] = useState(-1);
  const [comment, setComment] = useState("");
  const [commentPosted, setCommentPosted] = useState(false);
  const [urlTrailer, setUrlTrailer] = useState("");

  useEffect(() => {
    async function getComments() {
      await fetch(`${API_URL}/mostrarComentarios/${params.id}`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((response) => {
          setComments(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getComments();
  }, [commentPosted]);

  useEffect(() => {
    setRateValue(rate);
  }, [rate]);

  useEffect(() => {
    try {
      if(status === "ok"){
        const url = movie.TRAILER.toString();
        const video = url.split("v=")
        setUrlTrailer(video[1])
      }
    } catch (error) {
      console.log(error)
    }
  }, [status]);

  if (status !== "ok" && statusRate !== "ok") {
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

  if (error !== undefined && errorRate !== undefined) {
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
    try {
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
    } catch (error) {
      console.log(error);
    }

    return null;
  };

  const handleOnComment = async () => {
    if (comment === "") {
      return;
    }

    const bodyRequest = {
      id_usuario: user,
      id_pelicula: params.id,
      descripcion: comment,
    };
    await fetch(`${API_URL}/agregarComentario`, {
      method: "POST",
      body: JSON.stringify(bodyRequest),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {
        setComment("");
        setCommentPosted(!commentPosted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setComment("");
      });
  };

  const handleOnRating = async (e, newValue) => {
    e.preventDefault();
    await fetch(`${API_URL}/calificarPelicula`, {
      method: "POST",
      body: JSON.stringify({
        id_usuario: user,
        id_pelicula: params.id,
        punteo: +newValue,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {
        setRateValue(newValue);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setComment("");
      });
  };

  return (
    <>
      <NavbarU />
      <div className="grid grid-cols-2 grid-rows-1 g-3 p-2 ">
        <div className="justify-items-start w-full ">
          <h1 className="text-white flex flex-col align-items-center justify-center ml-auto">
            {movie.NOMBRE ? movie.NOMBRE : ""}
          </h1>
          <div className="inline m-2">
            <small className="text-white">Resumen:</small>
            <p className="text-gray-200	flex flex-col align-items-center ml-auto">
              {movie.RESUMEN}
            </p>
          </div>
          <div className="inline m-1">
            <small className="text-white">Director:</small>
            <p className="text-gray-200	flex flex-col align-items-center ml-auto">
              {movie.DIRECTOR}
            </p>
          </div>
          <div className="inline m-1">
            <small className="text-white">Fecha De Estreno:</small>
            <p className="text-gray-200	flex flex-col align-items-center ml-auto">
              {new Date(movie.FECHA_ESTRENO).toLocaleDateString("en-US")}
            </p>
          </div>
        </div>
        <div className="flex align-items-start justify-center w-full">
          <embed
            variant="top"
            className="max-w-none w-96 flex justify-center align-items-center h-full"
            src={`https://www.youtube.com/embed/` + urlTrailer}
          />
        </div>
        <div className="flex justify-center h-8">
          <ul className="inline-block space-x-4">{renderReparto()}</ul>
        </div>
        <div className="flex align-items-start justify-center h-8">
          <Rating
            name="rating"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => handleOnRating(event, newValue)}
          />
        </div>
      </div>
      <div className="mt-3 p-2 w-full rounded-md ml-5 flex flex-col mx-auto align-items-center ">
        <h3 style={{ color: "white" }}>Deja un comentario</h3>
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
            value={comment}
            onChange={(e) => setComment(e.target.value.toString())}
          />
          <Button
            className="flex align-items-end justify-end mx-auto"
            variant="success"
            onClick={handleOnComment}
          >
            Comentar
          </Button>

          <h4 className="text-white p-2">Comentarios</h4>
          <ShowComments comments={comments} />
        </div>
      </div>
    </>
  );
};

export default Movie;

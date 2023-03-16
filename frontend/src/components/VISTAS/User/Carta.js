import React from "react";
import { Button, Card } from "react-bootstrap";

function Carta(props) {
  var video = props.video.split("v=");

  const ver = () => {
    window.location.href = "/infoPeli/" + props.id;
  };

  const eliminar = () => {
    fetch(`https://localhost:5000/eliminarPeliculaWatchlist/${props.idW}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La petición ha fallado");
        }
        window.location.reload();
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // si quieres, puedes actualizar tu estado o llamar a otra función aquí
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card style={{ width: "20%", margin: "10px" }}>
      <embed variant="top" src={`https://www.youtube.com/embed/` + video[1]} />
      <Card.Body>
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Text>Estreno: {props.fecha}</Card.Text>
        <Button variant="success" onClick={ver}>
          VER
        </Button>
        <Button
          variant="danger"
          style={{ marginLeft: "10%" }}
          onClick={eliminar}
        >
          ELIMINAR
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Carta;

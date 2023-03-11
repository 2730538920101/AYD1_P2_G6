import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';

const Movie = () => {
  const params = useParams();
  return (
    <div class="grid grid-cols-2 grid-rows-3 gap-4 p-4">
      <div className="justify-items-start  h-full w-full">
        <Form.Group className="p-3 w-auto" controlId="name">
          <FloatingLabel controlId="name" label="Nombre" className="mb-3">
            <Form.Control type="text" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="p-3 w-auto" controlId="name">
          <FloatingLabel controlId="name" label="Director" className="mb-3">
            <Form.Control type="text" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="p-3 w-auto" controlId="name">
          <FloatingLabel
            controlId="name"
            label="Fecha de Estreno"
            className="mb-3"
          >
            <Form.Control type="date" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="p-3 w-auto" controlId="name">
          <FloatingLabel controlId="name" label="Resumen" className="mb-3">
            <Form.Control type="text" as="textarea" />
          </FloatingLabel>
        </Form.Group>
      </div>
      <div className="flex align-items-start justify-center  h-full w-full">
        <img
          className="max-w-none w-96 flex justify-center align-items-center"
          src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
          alt="no-image"
        />
      </div>
      <div>
        <ul className="inline-block space-x-4">
          <li className="inline">link here</li>
          <li className="inline">link here</li>
        </ul>
      </div>
    </div>
  );
};

export default Movie;

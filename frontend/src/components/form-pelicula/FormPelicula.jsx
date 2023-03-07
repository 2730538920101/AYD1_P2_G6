import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "../form-input/FormInput";
import API_URL from "../../app/constants";
import GetActors from "../../hooks/get-actors/GetActors.js";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { AutoComplete } from "../autcomplete/Autocomplete";
import ListGroup from "react-bootstrap/ListGroup";

const validationSchema = z.object({
  nombre: z.string().min(1, { message: "Campo Obligatorio" }),
  director: z.string().min(1, { message: "Campo Obligatorio" }),
  fecha_estreno: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  resumen: z.string().min(1, { message: "Campo Obligatorio" }),
  trailer: z.string().min(1, { message: "Campo Obligatorio" }),
});

const FormPelicula = () => {
  const [status, error, data] = GetActors();
  const [actors, setActors] = useState([]);
  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });
  const [isError, setIsError] = useState("");
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {

    if (actors.length === 0) {
      setIsError("El reparto no puede ser vacio");
      return;
    } else { 
      setIsError("");
    }

    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful, actors]);

  if (status === "procesando") {
    return (
      <Spinner animation="border" role="status">
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

  const onSubmitForm = async (values) => {
    if(actors.length === 0) {
      return
    }

    const requestBody = {...values, reparto: [...actors.map((actor)=> actor.ACT_ID) ]}


    await fetch(`${API_URL}/crearPelicula`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {})
      .catch((error) => {
        console.log(error);
        setIsError("Ha ocurrido un error al procesar la peticion");
      });
  };

  return (
    <div className="h-screen flex mt-auto ">
      <div className="max-w-md ml-auto  my-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <h2 className="font-medium antialiased p-2">
          Registrar Nueva Pelicula
        </h2>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <FormInput
              placeholder="Ingresa el nombre de la pelicula"
              errors={errors}
              name="nombre"
              controlId="idNameMovie"
              type="text"
              register={register}
            />
            <FormInput
              placeholder="Nombre del Director"
              errors={errors}
              name="director"
              controlId="idNameDirector"
              type="text"
              register={register}
            />
            <FormInput
              placeholder="Fecha de Estreno"
              errors={errors}
              name="fecha_estreno"
              controlId="idReleaseDate"
              type="date"
              register={register}
            />
            <AutoComplete options={data} setSelected={setActors} />
            <FormInput
              placeholder="Resumen"
              errors={errors}
              name="resumen"
              controlId="idOverview"
              type="textarea"
              register={register}
              props={{ as: "textarea" }}
            />
            <FormInput
              placeholder="Url del Trailer"
              errors={errors}
              name="trailer"
              controlId="idTrailer"
              type="text"
              register={register}
            />
            <Button className="p-2 w-100 " type="submit">
              Submit
            </Button>
          </Form>
        </FormProvider>
        {isError && (
          <small className="">
            <p className="text-red-600">{isError}</p>
          </small>
        )}
      </div>

      <div className="max-w-md my-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl p-4 mx-auto">
        <h2>Miembros del reparto</h2>
        <ListGroup>
          {actors.map((actor, index) => (
            <ListGroup.Item key={index}>{actor.NOMBRE}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default FormPelicula;

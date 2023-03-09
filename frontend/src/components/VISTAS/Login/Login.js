import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "../../form-input/FormInput";
import API_URL from "../../../app/constants";
import Form from "react-bootstrap/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const validationSchema = z.object({
    nombre: z.string().min(1, { message: "Campo Obligatorio" }),
    contrasenia: z.string().min(1, { message: "Campo Obligatorio" }),
  });

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  function mostrarComponente() {
    setMostrarAlert(true);
    setTimeout(() => setMostrarAlert(false), 3000);
  }

  const onSubmitFormSesion = async (values) => {
    console.log(values);
    if (values.nombre === "admin" && values.contrasenia === "admin") {
      navigate("/NuevaPelicula");
    } else {
      await fetch(
        `${API_URL}/buscarUsuario/${values.nombre}/${values.contrasenia}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.respuesta !== null) {
            const usuarioJSON = JSON.stringify(res.respuesta);
            localStorage.setItem("usuario", usuarioJSON);
            navigate("/Peliculas");
          } else {
            mostrarComponente();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Container>
        <br></br>
        <h1>Login</h1>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmitFormSesion)}>
            <FormInput
              placeholder="Ingresa tu nombre"
              errors={errors}
              name="nombre"
              controlId="idNombre"
              type="text"
              register={register}
            />
            <FormInput
              placeholder="Ingresa tu contraseña"
              errors={errors}
              name="contrasenia"
              controlId="idPassword"
              type="password"
              register={register}
            />
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
            <Link to="/registro">
              <Button variant="warning" type="button" style={{ margin: "1%" }}>
                Registro
              </Button>
            </Link>
          </Form>
          {mostrarAlert && (
            <div
              className="alert alert-dismissible alert-danger"
              style={{ margin: "3%" }}
            >
              <strong>Error!</strong> Credenciales invalidas.
            </div>
          )}
        </FormProvider>
      </Container>
    </div>
  );
}

export default Login;

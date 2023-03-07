import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormInput from "../../form-input/FormInput";
import API_URL from "../../../app/constants";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Registro() {
  const validationSchema = z.object({
    nombre: z.string().min(1, { message: "Campo Obligatorio" }),
    apellido: z.string().min(1, { message: "Campo Obligatorio" }),
    correo: z
      .string()
      .email({ message: "Ingrese un correo valido." })
      .min(1, { message: "Campo Obligatorio" }),
    password: z.string().min(1, { message: "Campo Obligatorio" }),
  });

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitForm = async (values) => {
    console.log(values);
    await fetch(`${API_URL}/crearUsuario`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((res) => {
        alert(res.respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container>
        <div style={{ margin: "2%" }}>
          <h1>Registro</h1>
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormInput
                placeholder="Ingresa tu nombre"
                errors={errors}
                name="nombre"
                controlId="idNombreUser"
                type="text"
                register={register}
              />
              <FormInput
                placeholder="Ingresa tu apellido"
                errors={errors}
                name="apellido"
                controlId="idApellidoUser"
                type="text"
                register={register}
              />
              <FormInput
                placeholder="Ingresa tu correo electrónico"
                errors={errors}
                name="correo"
                controlId="idCorreoUser"
                type="email"
                register={register}
              />
              <FormInput
                placeholder="Ingresa una contraseña"
                errors={errors}
                name="password"
                controlId="idPasswordUser"
                type="password"
                register={register}
              />
              <Button variant="primary" type="submit">
                Registrar usuario
              </Button>
              <Link to="/">
                <Button
                  variant="warning"
                  type="button"
                  style={{ margin: "2%" }}
                >
                  Login
                </Button>
              </Link>
            </Form>
          </FormProvider>
        </div>
      </Container>
    </div>
  );
}

export default Registro;

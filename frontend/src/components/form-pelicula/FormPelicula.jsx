import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "../form-input/FormInput";
import API_URL from "../../app/constants";
import AlertMessage from "../alert-message/Alert";

const validationSchema = z.object({
  name: z.string().min(1, { message: "Campo Obligatorio" }),
  director: z.string().min(1, { message: "Campo Obligatorio" }),
  releaseDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  overview: z.string().min(1, { message: "Campo Obligatorio" }),
  trailer: z.string().min(1, { message: "Campo Obligatorio" }),
});

const FormPelicula = () => {
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
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitForm = async (values) => {
    await fetch(`${API_URL}/crearPelicula`, {
      method: "POST",
      body: JSON.stringify(values),
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
    <div className="h-screen flex ">
      <div className="w-screen flex align-items-center justify-center ">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <h2 className="font-medium antialiased w-auto p-2">
            Registrar Nueva Pelicula
          </h2>
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <FormInput
                placeholder="Ingresa el nombre de la pelicula"
                errors={errors}
                name="name"
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
                name="releaseDate"
                controlId="idReleaseDate"
                type="date"
                register={register}
              />
              <FormInput
                placeholder="Resumen"
                errors={errors}
                name="overview"
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
      </div>
    </div>
  );
};

export default FormPelicula;

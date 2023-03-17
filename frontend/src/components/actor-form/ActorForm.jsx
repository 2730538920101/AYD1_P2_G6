import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "../form-input/FormInput";
import API_URL from "../../app/constants";
import Spinner from "react-bootstrap/Spinner";

const validationSchema = z.object({
  nombre: z.string().min(1, { message: "Campo Obligatorio" }),
  fecha_nacimiento: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  descripcion: z.string().min(1, { message: "Campo Obligatorio" }),
  foto: z.string().min(1, { message: "Campo Obligatorio" }),
});

const ActorForm = () => {
  const [isError, setIsError] = useState("");
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
    // eslint-disable-next-line
  }, [isSubmitSuccessful]);

  const onSubmitForm = async (values) => {
    console.log(values);

    await fetch(`${API_URL}/crearActor`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(() => {})
      .catch(() => {
        setIsError("Ha ocurrido un error al procesar la peticion");
      });
  };

  return (
    <div className="h-screen flex">
      <div className="lg:w-4/5 mx-auto  my-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
        <h2 className=" antialiased p-2 flex justify-center">
          Registrar Actor
        </h2>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <FormInput
              placeholder="Ingresa el nombre del actor"
              errors={errors}
              name="nombre"
              controlId="idActorName"
              type="text"
              register={register}
            />
            <FormInput
              placeholder="Fecha de Nacimiento"
              errors={errors}
              name="fecha_nacimiento"
              controlId="idBornDate"
              type="date"
              register={register}
            />
            <FormInput
              placeholder="Descripcion"
              errors={errors}
              name="descripcion"
              controlId="idDescription"
              type="textarea"
              register={register}
              props={{ as: "textarea" }}
            />
            <FormInput
              placeholder="Foto de Perfil"
              errors={errors}
              name="foto"
              controlId="idPhoto"
              type="text"
              register={register}
            />
            <Button className="p-2 w-100 " type="submit">
              Crear
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
  );
};

export default ActorForm;

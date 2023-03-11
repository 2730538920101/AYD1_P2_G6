import { useState, useEffect } from "react";

const useGetMovie = ({id}) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    async function getMovie() {
      setStatus("procesando");
      await fetch(`${API_URL}/mostrarPelicula/${id}`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((response) => {
          setData(response);
          setStatus("ok");
        })
        .catch((error) => {
          setError(error);
          setStatus("not ok");
        });
    }

    getMovie();
  }, [id]);

  return [status, error, data];
};

export default useGetMovie;

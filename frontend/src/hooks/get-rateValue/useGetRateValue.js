import { useState, useEffect } from "react";
import API_URL from "../../app/constants";

const useGetRateValue = (id_usuario, id_pelicula) => {
  const [status, setStatus] = useState("sleep");
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getRateValue() {
      setStatus("procesando");
      await fetch(
        `${API_URL}/devolverCalificacion/${id_pelicula}/${id_usuario}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          setData(response.respuesta[0]);
          setStatus("ok");
        })
        .catch((error) => {
          setError(error);
          setStatus("not ok");
        });
    }

    getRateValue();
  }, [id_usuario, id_pelicula]);

  return [status, error, data];
};

export default useGetRateValue;

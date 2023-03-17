import { useState, useEffect } from "react";
import API_URL from "../../app/constants";

const useGetComments = (id) => {
  const [status, setStatus] = useState("sleep");
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getComments() {
      setStatus("procesando");
      await fetch(`${API_URL}/mostrarComentarios/${id}`, {
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
    getComments();
  }, [id]);

  return [status, error, data];
};

export default useGetComments;

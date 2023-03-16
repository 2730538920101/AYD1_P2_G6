import { useState, useEffect } from "react";
import API_URL from "../../app/constants";

const useGetWatchlist = (id) => {
  const [status, setStatus] = useState("sleep");
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getLista() {
      setStatus("procesando");
      await fetch(`${API_URL}/mostrarWatchlist/${id}`, {
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

    getLista();
  }, [id]);

  return [status, error, data];
};

export default useGetWatchlist;

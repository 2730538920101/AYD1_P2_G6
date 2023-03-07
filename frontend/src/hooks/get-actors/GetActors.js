import { useEffect, useState } from "react";
import API_URL from "../../app/constants";

const GetActors = () => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getActorsFromServer() {
      setStatus("procesando");
      await fetch(`${API_URL}/mostrarActores`, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("en hook: ", response);
          setData(response);
          setStatus("ok");
        })
        .catch((error) => {
          setError(error);
          setStatus("not ok");
        });
    }

    getActorsFromServer();
  }, []);

  return [status, error, data];
};

export default GetActors;

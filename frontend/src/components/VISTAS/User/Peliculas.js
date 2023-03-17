import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import NavbarU from "../../Navbars/NavbarU";
import MaterialReactTable from "material-react-table";
import API_URL from "../../../app/constants";
import { Link } from "react-router-dom";

function Peliculas() {
  const [data, setData] = useState([]);
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const [message, setMessage] = useState();
  const user = localStorage.getItem("usuario");

  function mostrarComponente() {
    setMostrarAlert(true);
    setTimeout(() => setMostrarAlert(false), 3000);
  }

  const verPeliculas = async () => {
    await fetch(`${API_URL}/mostrarPeliculas`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const añadirFav = async (id) => {
    console.log(id);
    let bodyFav = {
      id_usuario: user,
      id_pelicula: id,
    };
    await fetch(`${API_URL}/agregarPeliculaWatchlist`, {
      method: "POST",
      body: JSON.stringify(bodyFav),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.respuesta);
        mostrarComponente();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    verPeliculas();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "NOMBRE",
        header: "Nombre",
        id: "nombre",
      },
      {
        accessorKey: "DIRECTOR",
        header: "Director",
        id: "director",
      },
      {
        accessorKey: "FECHA_ESTRENO",
        header: "Fecha",
        id: "fecha",
        Cell: ({ row }) => row.original.FECHA_ESTRENO.split("T")[0],
      },
      {
        accessorKey: "TRAILER",
        header: "Trailer",
        id: "trailer",
      },
      {
        Header: "Acciones",
        accessor: "acciones",
        id: "actions",
        Cell: ({ row }) => (
          <div>
            <Link to={`/infoPeli/${row.original.PEL_ID}`}>
              <Button variant="info">
                {" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h7 style={{ margin: "5%" }}>Ver</h7>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/777/777242.png"
                    width="28px"
                    height="8px"
                    alt="ver"
                  />
                </div>
              </Button>
            </Link>
            <Button
              variant="warning"
              style={{ margin: "1.5%" }}
              onClick={() => {
                añadirFav(row.original.PEL_ID);
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <h7 style={{ margin: "5%" }}>Añadir</h7>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2377/2377810.png"
                  width="28px"
                  height="8px"
                  alt="fav"
                />
              </div>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <NavbarU />
      <div>
        <br></br>
        <Container>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                color: "white",
                backgroundColor: "#c1121f",
                borderRadius: "5%",
                padding: "2%",
              }}
            >
              <b>P E L I C U L A S</b>
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/512/705/705062.png"
              alt="iconoPeli"
              width="175px"
              height="175px"
            />
          </div>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnActions={false}
            enableColumnFilters={false}
            enablePagination={true}
            enableSorting={false}
            enableBottomToolbar={true}
            enableTopToolbar={true}
            muiTableBodyRowProps={{ hover: true }}
          />
          {mostrarAlert && (
            <div
              className="alert alert-dismissible alert-warning"
              style={{ margin: "3%" }}
            >
              {message}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Peliculas;

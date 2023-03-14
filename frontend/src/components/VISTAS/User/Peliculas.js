import React, { useEffect, useMemo, useState } from "react";
import { Button, Container } from "react-bootstrap";
import NavbarU from "../../Navbars/NavbarU";
import MaterialReactTable from "material-react-table";
import API_URL from "../../../app/constants";
import { Link } from "react-router-dom";

function Peliculas() {
  const [data, setData] = useState([]);

  const verPeliculas = async () => {
    await fetch(`${API_URL}/mostrarPeliculas`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
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
              <Button variant="info">Ver</Button>
            </Link>
            <Button variant="warning" style={{ margin: "1.5%" }}>
              Añadir
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
          <h1 style={{ color: 'white' }}>Peliculas</h1>
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
        </Container>
      </div>
    </>
  );
}

export default Peliculas;

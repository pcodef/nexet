import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Container } from "@mui/material";
import axios from "axios";

const Entities = () => {
  //1 - configuramos Los hooks
  const [entities, setEntities] = useState([]);

  //2 - fcion para mostrar los datos con axios
  const endpoint = "http://localhost:8000/api/buyers/";

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data;
      //console.log(data);
      setEntities(data.buyers);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //3 - Definimos las columns
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        display: false,
      },
    },
    {
      name: "RUC",
      label: "RUC",
    },
    {
      name: "name",
      label: "Nombre",
      options: {
        customBodyRender: (value, tableMeta) => {
          // Obtén el valor de "id" de los datos de la fila
          const id = tableMeta.rowData[0];
          const url = `https://example.com/${id}`; // Reemplaza con la URL base deseada

          return (
            <a href={url} target="_blank">
              {value}
            </a>
          );
        },
      },
    },
    {
      name: "procesos",
      label: "Procesos",
    },
    {
      name: "monto",
      label: "Monto",
    },
  ];

  const options = {
    responsive: "standard",
    selectableRows: "none",
    filter: false,
    print: false,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <MUIDataTable
        title={"Lista de Entidades"}
        data={entities}
        columns={columns}
        options={options}
      />
    </Container>
  );
};

export default Entities;

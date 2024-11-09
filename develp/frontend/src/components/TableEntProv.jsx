import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

const TableEntProv = ({ endpoint, title, dataKey }) => {
  const [data, setData] = useState([]);

  // Cargar datos desde el endpoint
  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data[dataKey]); // Accede a la clave según dataKey
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [endpoint]);

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
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }), // Centrar el contenido de la columna
      },
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
      options: {
        setCellProps: () => ({ style: { textAlign: "center" } }), // Centrar el contenido de la columna
      },
    },
    {
      name: "monto",
      label: "Monto",
      options: {
        customBodyRender: (value) => {
          // Formatear el valor como moneda peruana
          const formattedValue = new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(value);

          return formattedValue;
        },
        setCellProps: () => ({ style: { textAlign: "center" } }), // Centrar el contenido de la columna
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    filter: false,
    print: false,
  };

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default TableEntProv;

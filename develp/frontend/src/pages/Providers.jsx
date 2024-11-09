import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Container } from "@mui/material";
import axios from "axios";

const Providers = () => {
  //1 - configuramos Los hooks
  const [products, setProducts] = useState([]);

  //2 - fcion para mostrar los datos con axios
  const endpoint = "https://fakestoreapi.com/products";

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data;
      console.log(data);
      setProducts(data);
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
    },
    {
      name: "title",
      label: "TITLE",
    },
    {
      name: "price",
      label: "PRICE",
    },
    {
      name: "rating", // Cambiar la clave de 'rating.rate' a 'rating'
      label: "RATE",
      options: {
        customBodyRender: (value) => {
          // Asegurarse de que 'value' sea el objeto rating, y luego acceder a 'rate'
          return value?.rate ? value.rate : "N/A";
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    responsive: "standard",
    print: false,
    filer: false,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <MUIDataTable
        title={"Lista de Proveedores"}
        data={products}
        columns={columns}
        options={options}
      />
    </Container>
  );
};

export default Providers;

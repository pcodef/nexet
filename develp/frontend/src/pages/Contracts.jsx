import { Container, Button, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BasicCard from "../components/BasicCard";
import DescriptionTables from "../components/DescriptionTables";
import Loading from "./Loading"; // Importa el componente Loading

const Contracts = () => {
  const { identidad, idproveedor } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de loading
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/contracts/${identidad}/${idproveedor}`
        );
        setData(response.data.contracts);
      } catch (error) {
        console.error("Error al cargar los contratos:", error);
      } finally {
        setLoading(false); // Cambia el estado a falso cuando los datos se hayan cargado
      }
    };

    fetchContracts();
  }, [identidad, idproveedor]);

  // Cálculo de los datos para la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < data.length) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) setPage(page - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <DescriptionTables
        title={`Contratos entre la entidad ${identidad} y proveedor ${idproveedor}`}
      />
      {loading ? (
        <Loading /> // Muestra el componente Loading mientras se están cargando los datos
      ) : (
        <>
          {currentData.map((item) => (
            <BasicCard
              key={item.ocid}
              ocid={item.ocid}
              title={item.convocatoria}
              monto={item.monto}
              fecha={item.fecha}
              descripcion={item.descripcion}
              url={item.url}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button onClick={handlePreviousPage} disabled={page === 1}>
              Anterior
            </Button>
            <Button onClick={handleNextPage} disabled={endIndex >= data.length}>
              Siguiente
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Contracts;

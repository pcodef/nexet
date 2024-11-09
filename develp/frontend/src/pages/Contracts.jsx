import { Container, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BasicCard from "../components/BasicCard";
import DescriptionTables from "../components/DescriptionTables";

const Contracts = () => {
  const { identidad, idproveedor } = useParams();
  const data = [
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria 2",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria 1",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria X",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066982",
      title: "Numero de convocatoria Y",
      monto: "1223",
      fecha: "2024-10-22",
      descripcion: "Descripción de la convocatoria 1",
    },
    {
      ocid: "ocds-dgv273-seacev3-1066983",
      title: "Numero de convocatoria Z",
      monto: "2456",
      fecha: "2024-11-02",
      descripcion: "Descripción de la convocatoria 2",
    },

    // Agrega más objetos para simular los datos...
  ];

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  // Calcula las tarjetas que se mostrarán en la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Maneja la navegación entre páginas
  const handleNextPage = () => {
    if (endIndex < data.length) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) setPage(page - 1);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <DescriptionTables
          title={`Contratos entre la entidad ${identidad} y proveedor ${idproveedor}`}
        />
        {currentData.map((item) => (
          <BasicCard
            key={item.ocid}
            ocid={item.ocid}
            title={item.title}
            monto={item.monto}
            fecha={item.fecha}
            descripcion={item.descripcion}
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
      </Container>
    </>
  );
};

export default Contracts;

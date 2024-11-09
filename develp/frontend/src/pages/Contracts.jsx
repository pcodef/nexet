import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import BasicCard from "../components/BasicCard";
import DescriptionTables from "../components/DescriptionTables";

const Contracts = () => {
  const { identidad, idproveedor } = useParams();
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <DescriptionTables
          title={`Contratos entre la entidad ${identidad} y proveedor ${idproveedor}`}
          description="None"
        />
        <BasicCard
          ocid={`Numero de ocid 1`}
          title={`Numero de convocatoria`}
          monto={`1223`}
          fecha={`2024-10-22`}
          descripcion={`ADQUISICION DE EQUIPO ECOGRAFO ESTACIONARIO. PARA LA OBRA:MEJORAMIENTO Y AMPLIACION DE LOS SERVICIOS DE SALUD DEL C.S DE JORGE CHAVEZ DE LA CIUDAD DE PUERTO MALDONADO DEL DISTRITO DE TAMBOPATA - PROVINCIA DE TAMBOPATA. (Bienes)`}
        />
      </Container>
    </>
  );
};

export default Contracts;

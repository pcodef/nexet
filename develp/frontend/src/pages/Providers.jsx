import React from "react";
import TableEntProv from "../components/TableEntProv";
import { Container } from "@mui/material";
import DescriptionTables from "../components/DescriptionTables";

const Providers = () => {
  const endpoint = "http://localhost:8000/api/suppliers/";

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <DescriptionTables
        title="Proveedores"
        description="Personas naturales o jurídicas (empresas) que ofrecen bienes, servicios u obras a las entidades públicas a través de procesos de contratación. Los proveedores pueden participar en las convocatorias lanzadas por las entidades, presentando propuestas que serán evaluadas para determinar su adecuación a los requisitos del contrato."
      />
      <TableEntProv
        title="Lista de Proveedores"
        endpoint={endpoint}
        dataKey="suppliers"
        typeEntity="providers"
      />
    </Container>
  );
};

export default Providers;

import React from "react";
import TableEntProv from "../components/TableEntProv";
import { Container } from "@mui/material";
import DescriptionTables from "../components/DescriptionTables";

const Entities = () => {
  const endpoint = "http://localhost:8000/api/buyers/";

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <DescriptionTables
        title="Entidades"
        description="Organizaciones o instituciones públicas que requieren bienes, servicios u obras y, por lo tanto, inician procesos de contratación para satisfacer esas necesidades. Estas entidades pueden ser ministerios, gobiernos regionales, municipalidades, organismos descentralizados, empresas públicas, entre otros organismos del Estado. "
      />
      <TableEntProv
        title="Lista de Entidades"
        endpoint={endpoint}
        dataKey="buyers"
        typeEntity="entities"
      />
    </Container>
  );
};

export default Entities;

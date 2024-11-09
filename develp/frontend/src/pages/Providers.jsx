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
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          culpa doloribus ipsa nihil? Laudantium, facere, facilis id quisquam
          veniam rerum expedita laborum, a aperiam minima molestias iure. Nam,
          rem vero."
      />
      <TableEntProv
        title="Lista de Proveedores"
        endpoint={endpoint}
        dataKey="suppliers"
      />
    </Container>
  );
};

export default Providers;

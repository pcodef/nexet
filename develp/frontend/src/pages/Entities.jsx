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
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          culpa doloribus ipsa nihil? Laudantium, facere, facilis id quisquam
          veniam rerum expedita laborum, a aperiam minima molestias iure. Nam,
          rem vero."
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

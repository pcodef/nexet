import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Volver a la página principal
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;

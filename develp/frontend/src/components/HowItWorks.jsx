import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import paso1 from "../assets/paso1.png";
import paso2 from "../assets/paso1.png";
import paso3 from "../assets/paso1.png";

const steps = [
  {
    step: "Paso 1",
    description: "Busca y selecciona entidades o proveedores en tiempo real.",
    img: paso1,
  },
  {
    step: "Paso 2",
    description: "Visualiza conexiones sospechosas",
    img: paso2,
  },
  {
    step: "Paso 3",
    description: "Explora los detalles de la contratacion",
    img: paso3,
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Cómo Funciona
      </Typography>
      <Grid container spacing={3}>
        {steps.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.step}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.step}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;

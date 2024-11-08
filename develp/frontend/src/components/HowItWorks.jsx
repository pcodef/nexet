import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const steps = [
  { step: 'Paso 1', description: 'Busca y selecciona entidades en tiempo real.' },
  { step: 'Paso 2', description: 'Analiza relaciones y conexiones anómalas.' },
  { step: 'Paso 3', description: 'Explora redes de influencia y genera reportes.' },
];

const HowItWorks = () => {
  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;

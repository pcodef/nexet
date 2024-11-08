import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const features = [
  { title: 'Monitoreo de Relaciones', description: 'Relaciones entre entidades y contratistas en tiempo real.' },
  { title: 'Detección de Influencias', description: 'Identificación de patrones de riesgo en contrataciones.' },
  { title: 'Visualización Interactiva', description: 'Explora redes de influencia con gráficos intuitivos.' },
];

const KeyFeatures = () => {
  return (
    <Grid container spacing={3} sx={{ padding: '2rem' }}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5">{feature.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KeyFeatures;

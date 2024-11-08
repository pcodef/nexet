import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Nexet - Monitoreo de Redes de Influencia
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Transparencia y rendición de cuentas en las contrataciones públicas.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default HeroSection;

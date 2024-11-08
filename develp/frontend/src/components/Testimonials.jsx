import React from "react";
import { Box, Typography } from "@mui/material";

const Testimonials = () => {
  return (
    <Box sx={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom>
        Testimonios
      </Typography>
      <Typography variant="body1" color="textSecondary">
        "Nexet ha transformado la manera en que supervisamos las contrataciones públicas. Una herramienta imprescindible."
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        - Ministerio de Transparencia
      </Typography>
    </Box>
  );
};

export default Testimonials;

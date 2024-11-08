import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CTA = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f0f0f0' }}>
      <Typography variant="h4">Únete a Nexet</Typography>
      <Typography variant="body1" color="textSecondary">
        Da el primer paso hacia la transparencia en contrataciones.
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
        Sign Up Now
      </Button>
    </Box>
  );
};

export default CTA;

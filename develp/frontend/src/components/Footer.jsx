import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '1rem', backgroundColor: '#1976d2', color: 'white' }}>
      <Typography variant="body2">&copy; 2024 Nexet. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;

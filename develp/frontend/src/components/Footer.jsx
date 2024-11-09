import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Sección Nombre de la Empresa */}
        <Box>
          <Typography variant="h6" fontWeight="bold">
            NEXET
          </Typography>
        </Box>

        {/* Sección Redes Sociales */}
        <Box>
          <IconButton
            color="inherit"
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
        </Box>

        {/* Sección Derechos de Autor */}
        <Box>
          <Typography variant="body2">
            &copy; 2024 Nexet. Todos los derechos reservados.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;

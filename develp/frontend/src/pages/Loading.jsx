import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Cargando, por favor espera...
      </Typography>
    </Box>
  );
};

export default Loading;

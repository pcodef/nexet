import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = ({ ocid, descripcion, fecha, title, monto }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {ocid}
        </Typography>
        <Typography variant="h5" component="div">
          {`Convocatoria: ${title}`}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {fecha}
        </Typography>
        <Typography variant="body2">{descripcion}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver contrato</Button>
        <Button
          size="small"
          onClick={() =>
            window.open(
              `https://contratacionesabiertas.osce.gob.pe/proceso/${ocid}`,
              "_blank"
            )
          }
        >
          Más información
        </Button>
        <Box sx={{ flexGrow: 1 }} /> {/* Espaciador flexible */}
        <Typography variant="body2" sx={{ color: "green", fontWeight: "bold" }}>
          {`S/ ${monto}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default BasicCard;

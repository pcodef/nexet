import React from "react";
import Typography from "@mui/material/Typography";

const DescriptionTables = ({ title, description }) => {
  return (
    <>
      <Typography
        align="center"
        children={title}
        variant="h3"
        sx={{
          mb: 3,
        }}
      />
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
        {description}
      </Typography>
    </>
  );
};

export default DescriptionTables;

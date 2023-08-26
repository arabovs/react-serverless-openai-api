import React from "react";
import { Box, Paper, Avatar } from "@mui/material";
import { Button } from "gatsby-theme-material-ui";

export const Navigation = () => {
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 2.5, mb: 2.5 }}
      >
        <Button variant="contained" sx={{ ml: 1, mr: 1 }} to="/">
          Дневен Хороскоп
        </Button>
        <Button variant="contained" sx={{ ml: 1, mr: 1 }} to="/tarot">
          Таро Карти
        </Button>
      </Box>
    </div>
  );
};

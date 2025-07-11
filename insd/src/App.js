import React from "react";
import { Box } from "@mui/material";
import HoldingCard from "./components/HoldingCard/HoldingCard"

function App() {
  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f3f3f3"
    >
      <HoldingCard />
    </Box>
  );
}

export default App;

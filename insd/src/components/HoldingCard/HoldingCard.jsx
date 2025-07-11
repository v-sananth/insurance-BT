import { useState } from "react";
import { Card, CardContent, Box } from "@mui/material";
import CardHeader from "../CardHeader/CardHeader";
import HoldingPieChart from "../../components/PieChart/HoldingPieChart";
import HoldingTable from "./HoldingTable";

const HoldingCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        width: expanded ? "100%" : 998,
        height: expanded ? "100vh" : 495,
        padding: 2,
        position: "relative",
        transition: "all 0.3s ease",
      }}
    >
      <CardHeader expanded={expanded} onExpand={() => setExpanded(!expanded)} />

      <CardContent sx={{ paddingTop: 1 }}>
        <Box display="flex" gap={2}>
          <HoldingPieChart />
          <HoldingTable />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HoldingCard;

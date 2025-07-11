import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Fixed Income", value: 85.74 },
  { name: "MBS", value: 5.35 },
  { name: "AVS", value: 4.21 },
  { name: "Other", value: 4.7 },
];

const COLORS = ["#0d1540", "#3765c5", "#9fd4f2", "#8fbc8f"];

const HoldingPieChart = () => {
  return (
    <Box width="30%" display="flex" flexDirection="column" alignItems="center">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={60}
          innerRadius={40}
          fill="#8884d8"
          paddingAngle={2}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Typography variant="body2" align="center">
        ALL GL Group
        <br />
        10 Portfolio
      </Typography>
    </Box>
  );
};

export default HoldingPieChart;

// DonutChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const DonutChart = ({ viewBy, data, onLegendClick }) => {
  const chartData = data.map((item, index) => ({
    name: item.label,
    value: typeof item.bookValue === 'string'
    ? parseFloat(item.bookValue.replace('$', '').replace('k', ''))
    : Number(item.bookValue) || 0
  }));

  const handleClick = (data, index) => {
    onLegendClick && onLegendClick(data.payload);
  };

  return (
    <div style={{ marginTop: 20, height: 300 }}>
      <Typography variant="body2" gutterBottom>
        {`Holdings Distribution by ${viewBy}`}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            onClick={handleClick}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value}k`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { tableData } from "../../data/holdingsData";

const HoldingTable = () => {
  return (
    <Box flex={1}>
      <RadioGroup row defaultValue="glGroup" sx={{ mb: 1 }}>
        <FormControlLabel
          value="assetClass"
          control={<Radio />}
          label="View By Asset Class"
        />
        <FormControlLabel
          value="glGroup"
          control={<Radio />}
          label="View By GL Group"
        />
      </RadioGroup>

      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>GL Group Name</TableCell>
              <TableCell>% of Book Value</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Book Value</TableCell>
              <TableCell>Market Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.bookValue}</TableCell>
                <TableCell>{row.units}</TableCell>
                <TableCell>{row.book}</TableCell>
                <TableCell>{row.market}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>100.00%</strong>
              </TableCell>
              <TableCell>
                <strong>7,951,890,563.82</strong>
              </TableCell>
              <TableCell>
                <strong>7,316,686,648.24</strong>
              </TableCell>
              <TableCell>
                <strong>7,098,895,622.10</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HoldingTable;

// DataGrid.js
import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';

const DataGrid = ({ viewBy, data }) => {
  const columns = [
    {
      field: 'label',
      headerName: viewBy === 'GL Group' ? 'GL Group Name' : 'Asset Class Name',
      flex: 1
    },
    { field: 'percent', headerName: '% of Book Value', flex: 1 },
    { field: 'units', headerName: 'Units', flex: 1 },
    { field: 'bookValue', headerName: 'Book Value', flex: 1 },
    { field: 'marketValue', headerName: 'Market Value', flex: 1 }
  ];

  const rows = data.map((item, index) => ({ id: index, ...item }));

  const showTotal = !data.selected;

  return (
    <Box sx={{ height: 300, width: '100%', marginTop: 2 }}>
      <Typography variant="body2" gutterBottom>
        {`Holdings Table (${viewBy})`}
      </Typography>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{ borderRadius: 1 }}
      />
      {showTotal && (
        <Typography variant="body2" align="right" sx={{ mt: 1 }}>
          <b>Total</b>
        </Typography>
      )}
    </Box>
  );
};

export default DataGrid;
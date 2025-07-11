import React, { useContext, useState } from 'react';
import {
  Card, CardHeader, CardContent, Box, FormControl, InputLabel, Select,
  MenuItem, RadioGroup, FormControlLabel, Radio, IconButton, Button,
  Typography, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Drawer
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';

import DonutChart from './DonutChart';
import DataGrid from './DataGrid';
import { HoldingsContext } from './HoldingsContext';

const MyHoldingsCard = () => {
  const {
    portfolio, setPortfolio,
    dateFilter, setDateFilter,
    accountingBase, setAccountingBase,
    viewBy, setViewBy,
    data, fetchData,
    showCard, removeCard, restoreCard
  } = useContext(HoldingsContext);

  const [helpDialog, setHelpDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [restoreDialog, setRestoreDialog] = useState(false);

  if (!showCard) {
    return (
      <Box m={2}>
        <IconButton onClick={() => setRestoreDialog(true)}>
          <SettingsIcon />
        </IconButton>
        <Dialog open={restoreDialog} onClose={() => setRestoreDialog(false)}>
          <DialogTitle>Restore Card</DialogTitle>
          <DialogContent>
            <DialogContentText>Select 'My Holdings' to restore.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { restoreCard(); setRestoreDialog(false); }}>Apply</Button>
            <Button onClick={() => setRestoreDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return (
    <>
      <Card sx={{ m: 2 }}>
        <CardHeader
          title="My Holdings"
          action={
            <>
              <IconButton title="Expand" onClick={() => setExpanded(true)}><ExpandMoreIcon /></IconButton>
              <IconButton><MoreVertIcon /></IconButton>
            </>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Portfolio</InputLabel>
              <Select value={portfolio} onChange={(e) => setPortfolio(e.target.value)}>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Group">Group</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Period</InputLabel>
              <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                {['Prior Day', 'Prior Prior Day', 'Prior Month', 'Prior Quarter', 'Prior Year'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Accounting Base</InputLabel>
              <Select value={accountingBase} onChange={(e) => setAccountingBase(e.target.value)}>
                {['GAAP', 'Stat', 'Tax'].map(base => (
                  <MenuItem key={base} value={base}>{base}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <RadioGroup row value={viewBy} onChange={(e) => setViewBy(e.target.value)}>
                <FormControlLabel value="Asset Class" control={<Radio />} label="Asset Class" />
                <FormControlLabel value="GL Group" control={<Radio />} label="GL Group" />
              </RadioGroup>
            </FormControl>
          </Box>

          <DonutChart viewBy={viewBy} data={data} />
          <DataGrid viewBy={viewBy} data={data} />

          {data.length === 0 && (
            <Typography variant="body2" mt={2}>
              No data currently available
            </Typography>
          )}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button startIcon={<RefreshIcon />} onClick={fetchData}>Refresh</Button>
            <Button startIcon={<HelpOutlineIcon />} onClick={() => window.open('https://help.example.com', '_blank')}>Help</Button>
            <Button color="error" onClick={() => setRemoveDialog(true)}>Remove</Button>
          </Box>
        </CardContent>
      </Card>

      {/* Expand view in full-page drawer */}
      <Drawer anchor="top" open={expanded} onClose={() => setExpanded(false)} PaperProps={{ sx: { height: '100%' } }}>
        <Box p={3} height="100%" overflow="auto">
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5">My Holdings (Expanded)</Typography>
            <Button onClick={() => setExpanded(false)}>Close</Button>
          </Box>
          <DonutChart viewBy={viewBy} data={data} />
          <DataGrid viewBy={viewBy} data={data} />
        </Box>
      </Drawer>

      {/* Remove confirmation */}
      <Dialog open={removeDialog} onClose={() => setRemoveDialog(false)}>
        <DialogTitle>Remove Card</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to remove the 'My Holdings' card?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialog(false)}>Cancel</Button>
          <Button color="error" onClick={() => { removeCard(); setRemoveDialog(false); }}>Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyHoldingsCard;

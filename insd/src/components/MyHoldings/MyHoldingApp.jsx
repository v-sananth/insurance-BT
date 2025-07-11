// MyHoldingsApp.js
import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DonutChart from './DonutChart';
import DataGrid from './DataGrid';

const HoldingsContext = createContext();

const HoldingsProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState('Group');
  const [dateFilter, setDateFilter] = useState('Prior Month');
  const [accountingBase, setAccountingBase] = useState('GAAP');
  const [viewBy, setViewBy] = useState('Asset Class');
  const [selectedLegend, setSelectedLegend] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const mockData = [
      { label: 'Group A', percent: '30%', units: 100, bookValue: 100, marketValue: 120 },
      { label: 'Group B', percent: '70%', units: 200, bookValue: 300, marketValue: 350 }
    ];
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
  }, [portfolio, dateFilter, accountingBase, viewBy]);

  return (
    <HoldingsContext.Provider value={{
      portfolio, setPortfolio,
      dateFilter, setDateFilter,
      accountingBase, setAccountingBase,
      viewBy, setViewBy,
      data, setData,
      selectedLegend, setSelectedLegend,
      fetchData
    }}>
      {children}
    </HoldingsContext.Provider>
  );
};

const MyHoldingsCard = () => {
  const {
    portfolio, setPortfolio,
    dateFilter, setDateFilter,
    accountingBase, setAccountingBase,
    viewBy, setViewBy,
    data,
    selectedLegend, setSelectedLegend,
    fetchData
  } = useContext(HoldingsContext);

  const [showCard, setShowCard] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLegendClick = (item) => {
    setSelectedLegend(item);
  };

  const confirmRemove = () => {
    setShowCard(false);
    setOpenDialog(false);
  };

  const handleExpand = () => setExpanded(true);
  const closeExpand = () => setExpanded(false);

  const handleRefresh = () => fetchData();
  const handleHelp = () => setHelpOpen(true);

  if (!showCard) return null;

  return (
    <>
      <Card sx={{ m: 2, boxShadow: 3, borderRadius: 3 }}>
        <CardHeader
          title={<Typography variant="h6">My Holdings</Typography>}
          action={
            <div>
              <IconButton onClick={handleExpand} title="Expand">
                <ExpandMoreIcon />
              </IconButton>
              <IconButton title="Options">
                <MoreVertIcon />
              </IconButton>
            </div>
          }
        />
        <CardContent>
          <Box display="flex" flexWrap="wrap" gap={2}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Portfolio</InputLabel>
              <Select value={portfolio} onChange={e => setPortfolio(e.target.value)}>
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Group">Group</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Period</InputLabel>
              <Select value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                {['Prior Day', 'Prior Prior Day', 'Prior Month', 'Prior Quarter', 'Prior Year'].map(filter => (
                  <MenuItem key={filter} value={filter}>{filter}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Accounting Base</InputLabel>
              <Select value={accountingBase} onChange={e => setAccountingBase(e.target.value)}>
                {['GAAP', 'Stat', 'Tax'].map(base => (
                  <MenuItem key={base} value={base}>{base}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <RadioGroup row value={viewBy} onChange={e => setViewBy(e.target.value)}>
                <FormControlLabel value="Asset Class" control={<Radio />} label="View by Asset Class" />
                <FormControlLabel value="GL Group" control={<Radio />} label="View by GL Group" />
              </RadioGroup>
            </FormControl>
          </Box>

          <DonutChart viewBy={viewBy} data={data} onLegendClick={handleLegendClick} />
          <DataGrid viewBy={viewBy} data={data} />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button startIcon={<RefreshIcon />} onClick={handleRefresh}>Refresh</Button>
            <Button startIcon={<HelpOutlineIcon />} onClick={handleHelp}>Help</Button>
            <Button color="error" onClick={() => setOpenDialog(true)}>Remove</Button>
          </Box>
        </CardContent>
      </Card>

      <Drawer anchor="top" open={expanded} onClose={closeExpand} PaperProps={{ sx: { height: '100%' } }}>
        <Box p={3} height="100%" overflow="auto">
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5">My Holdings - Full View</Typography>
            <Button variant="outlined" onClick={closeExpand}>Close</Button>
          </Box>
          <DonutChart viewBy={viewBy} data={data} onLegendClick={handleLegendClick} />
          <DataGrid viewBy={viewBy} data={data} />
        </Box>
      </Drawer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Remove Card</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to remove the 'My Holdings' card from the dashboard?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmRemove} color="error">Remove</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
        <DialogTitle>Help - My Holdings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This card shows a summarized view of your holdings. Use filters to change portfolio type, time period, accounting base, and how the data is grouped.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const MyHoldingsApp = () => (
  <HoldingsProvider>
    <MyHoldingsCard />
  </HoldingsProvider>
);

export default MyHoldingsApp;

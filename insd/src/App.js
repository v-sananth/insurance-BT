import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { HoldingsProvider } from './components/MyHoldings/HoldingsContext';
import MyHoldingsCard from './components/MyHoldings/MyHoldingsCard';

const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for dark mode
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HoldingsProvider>
        <MyHoldingsCard />
      </HoldingsProvider>
    </ThemeProvider>
  );
}

export default App;
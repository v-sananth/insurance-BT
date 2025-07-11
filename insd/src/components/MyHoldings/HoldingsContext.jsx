import React, { createContext, useState, useEffect } from 'react';

export const HoldingsContext = createContext();

export const HoldingsProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState('Group');
  const [dateFilter, setDateFilter] = useState('Prior Month');
  const [accountingBase, setAccountingBase] = useState('GAAP');
  const [viewBy, setViewBy] = useState('Asset Class');
  const [selectedLegend, setSelectedLegend] = useState(null);
  const [data, setData] = useState([]);
  const [showCard, setShowCard] = useState(true);

  const fetchData = async () => {
    // In real scenario, use an API call here.
    const mockData = [
      {
        label: viewBy === 'GL Group' ? 'GL Group A' : 'Asset A',
        percent: '40%',
        units: 120,
        bookValue: 200,
        marketValue: 220,
      },
      {
        label: viewBy === 'GL Group' ? 'GL Group B' : 'Asset B',
        percent: '60%',
        units: 80,
        bookValue: 300,
        marketValue: 310,
      },
    ];
    setData(mockData);
  };

  useEffect(() => {
    fetchData();
  }, [portfolio, dateFilter, accountingBase, viewBy]);

  const removeCard = () => setShowCard(false);
  const restoreCard = () => setShowCard(true);

  return (
    <HoldingsContext.Provider
      value={{
        portfolio,
        setPortfolio,
        dateFilter,
        setDateFilter,
        accountingBase,
        setAccountingBase,
        viewBy,
        setViewBy,
        selectedLegend,
        setSelectedLegend,
        data,
        fetchData,
        showCard,
        removeCard,
        restoreCard,
      }}
    >
      {children}
    </HoldingsContext.Provider>
  );
};

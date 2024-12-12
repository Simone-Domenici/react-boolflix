import React, { useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({
    query: "",
    results: [],
    loading: false,
    error: null,
  });

  const setQuery = (query) => setState({ ...state, query });
  const startFetch = () => setState({ ...state, loading: true, error: null });
  const fetchSuccess = (results) =>
    setState({ ...state, results, loading: false });
  const fetchError = (error) => setState({ ...state, error, loading: false });

  const contextValue = {
    state,
    setQuery,
    startFetch,
    fetchSuccess,
    fetchError,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;

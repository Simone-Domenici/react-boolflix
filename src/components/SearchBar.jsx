import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const SearchBar = () => {
  const { state, setQuery } = useContext(GlobalContext);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={state.query}
        onChange={handleSearch}
        placeholder="Cerca un film..."
      />
      <button>Cerca</button>
    </div>
  );
};

export default SearchBar;

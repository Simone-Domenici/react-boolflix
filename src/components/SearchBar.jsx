import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';

const SearchBar = () => {
  const { state, setQuery, startFetch, fetchSuccess, fetchError } =
    useContext(GlobalContext);

  const handleSearch = async () => {
    if (!state.query.trim()) return;

    startFetch();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: '2a932018bf9b9741f9754017875f411b',
            query: state.query,
            language: 'it-IT',
          },
        }
      );
      fetchSuccess(response.data.results);
    } catch (error) {
      fetchError('Errore nella chiamata API');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={state.query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un film..."
      />
      <button onClick={handleSearch}>Cerca</button>
    </div>
  );
};

export default SearchBar;

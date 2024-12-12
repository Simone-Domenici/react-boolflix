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
            const [moviesResponse, tvResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: '2a932018bf9b9741f9754017875f411b',
                        query: state.query,
                        language: 'it-IT',
                    },
                }),
                axios.get(`https://api.themoviedb.org/3/search/tv`, {
                    params: {
                        api_key: '2a932018bf9b9741f9754017875f411b',
                        query: state.query,
                        language: 'it-IT',
                    },
                }),
            ]);

            const mergedResults = [
                ...moviesResponse.data.results,
                ...tvResponse.data.results,
            ];
            fetchSuccess(mergedResults);
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
                placeholder="Cerca un film o una serie TV..."
            />
            <button onClick={handleSearch}>Cerca</button>
        </div>
    );
};

export default SearchBar;

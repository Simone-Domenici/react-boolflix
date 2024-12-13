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

            const detailedResults = await Promise.all(
                mergedResults.map(async (item) => {
                    const type = item.title ? "movie" : "tv";
                    const detailsResponse = await axios.get(
                        `https://api.themoviedb.org/3/${type}/${item.id}`,
                        {
                            params: {
                                api_key: '2a932018bf9b9741f9754017875f411b',
                                language: 'it-IT',
                                append_to_response: 'credits',
                            },
                        }
                    );
                    return { ...item, details: detailsResponse.data };
                })
            );
            fetchSuccess(detailedResults);
            console.log(detailedResults);
            
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

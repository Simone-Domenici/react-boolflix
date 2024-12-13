import React, { useContext, useState } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';
import GenreFilter from './GenreFilter';

const SearchBar = () => {
    const { state, setQuery, startFetch, fetchSuccess, fetchError } =
        useContext(GlobalContext);
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    const fetchDetails = async (results) => {
        try {
            const detailedResults = await Promise.all(
                results.map(async (item) => {
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
                return detailedResults;
            } catch (error) {
                console.error("Errore nel caricamento dei dettagli:", error);
                return results;
            }
        };
        const handleSearch = async () => {
            if (!state.query.trim() && selectedGenres.length === 0) return;
        
            startFetch();
        
        try {
            const [moviesResponse, tvResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: '2a932018bf9b9741f9754017875f411b',
                        query: state.query,
                        language: 'it-IT',
                        with_genres: selectedGenres.join(','),
                    },
                }),
                axios.get(`https://api.themoviedb.org/3/search/tv`, {
                    params: {
                        api_key: '2a932018bf9b9741f9754017875f411b',
                        query: state.query,
                        language: 'it-IT',
                        with_genres: selectedGenres.join(','),
                    },
                }),
            ]);

            const mergedResults = [
                ...moviesResponse.data.results,
                ...tvResponse.data.results,
            ];

            const detailedResults = await fetchDetails(mergedResults)
            fetchSuccess(detailedResults);
            // console.log(detailedResults);    
        } catch (error) {
            fetchError('Errore nella chiamata API');
        }
    };

    const onApplyFilters = async (genres) => {
        setSelectedGenres(genres)

        if (genres.length === 0) {
            handleSearch()
            return
        }
        startFetch();
        try {
            const results = await Promise.all(
                genres.map(async (genreId) => {
                    const [moviesResponse, tvResponse] = await Promise.all([
                        axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                            params: {
                                api_key: '2a932018bf9b9741f9754017875f411b',
                                language: 'it-IT',
                                with_genres: genreId,
                            },
                        }),
                        axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                            params: {
                                api_key: '2a932018bf9b9741f9754017875f411b',
                                language: 'it-IT',
                                with_genres: genreId,
                            },
                        }),
                    ]);
                    return [...moviesResponse.data.results, ...tvResponse.data.results];
                })
            );

            const mergedResults = results.flat(); // Uniamo tutti i risultati
            const detailedResults = await fetchDetails(mergedResults);
            fetchSuccess(detailedResults);
        } catch (error) {
            fetchError('Errore nella chiamata API per i filtri');
        }
    }

    return (
        <div className='search-wrapper'>
            <input
                type="text"
                value={state.query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca un film o una serie TV..."
            />
            <button onClick={handleSearch}>Cerca</button>
            <GenreFilter onApplyFilters={onApplyFilters} />
        </div>
    );
};

export default SearchBar;

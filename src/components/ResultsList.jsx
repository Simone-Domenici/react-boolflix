import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import Card from './card/Card';


const ResultsList = () => {
    const { state } = useContext(GlobalContext);

    if (state.loading) return <p>Caricamento in corso...</p>;
    if (state.error) return <p>{state.error}</p>;
    if (state.results.length === 0) return <p>Nessun risultato trovato</p>;

    return (
        <div className="results-container">
            {state.results.map((result) => (
                <Card
                    key={result.id}
                    title={result.title || result.name}
                    originalTitle={result.original_title || result.original_name}
                    language={result.original_language}
                    vote={result.vote_average}
                    tagline={result.details.tagline || result.overview} 
                    posterPath={result.poster_path}
                    genres={result.details.genres.map((genre) => genre.name)}
                    cast={result.details.credits.cast.slice(0, 5).map((actor) => actor.name)}
                />
            ))}
        </div>
    );
};

export default ResultsList;

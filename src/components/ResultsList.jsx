import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar }  from '@fortawesome/free-solid-svg-icons';


const ResultsList = () => {
    const { state } = useContext(GlobalContext);

    const getFlagUrl = (languageCode) =>
        `https://flagcdn.com/w40/${languageCode.toLowerCase() === 'en' ? 'us' : languageCode.toLowerCase()}.png`;

    const getPosterUrl = (posterPath) => {
        return posterPath
            ? `https://image.tmdb.org/t/p/w342${posterPath}`
            : "https://via.placeholder.com/342x513?text=No+Image";
    };

    const getStars = (vote) => Math.ceil(vote / 2);

    const renderStars = (vote) => {
        const stars = getStars(vote);
        return (
            <span>
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={`${index < stars ? 'yellow-star' : 'gray-star'}`}
                    />
                ))}
            </span>
        );
    };

    if (state.loading) return <p>Caricamento in corso...</p>;
    if (state.error) return <p>{state.error}</p>;
    if (state.results.length === 0) return <p>Nessun risultato trovato</p>;

    return (
        <ul>
            {state.results.map((result) => (
                <li key={result.id}>
                    <img
                        src={getPosterUrl(result.poster_path)}
                        alt={result.title || result.name}
                        style={{ width: "150px", height: "225px" }}
                    />
                    <p><strong>Titolo:</strong> {result.title || result.name}</p>
                    <p><strong>Titolo Originale:</strong> {result.original_title || result.original_name}</p>
                    <p>
                        <strong>Lingua:</strong>{" "}
                        <img
                            src={getFlagUrl(result.original_language)}
                            alt={result.original_language}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/40x30?text=NA";
                            }}
                            style={{ width: "40px", height: "30px" }}
                        />
                    </p>
                    <p><strong>Voto:</strong> {renderStars(result.vote_average)}</p>
                </li>
            ))}
        </ul>
    );
};

export default ResultsList;

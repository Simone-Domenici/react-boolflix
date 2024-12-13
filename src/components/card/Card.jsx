import React from 'react';
import './Card.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar }  from '@fortawesome/free-solid-svg-icons';

const Card = ({ title, originalTitle, language, vote, overview, posterPath,  }) => {
  const getPosterUrl = (posterPath) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w342${posterPath}`
      : "https://via.placeholder.com/342x513?text=No+Image";
  };

  const getFlagUrl = (languageCode) =>
    `https://flagcdn.com/w40/${languageCode.toLowerCase() === 'en' ? 'us' : languageCode.toLowerCase()}.png`;

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

  return (
    <div className="card">
      <img
        src={getPosterUrl(posterPath)}
        alt={title}
        className="card-image"
      />
      <div className="card-overlay">
        <p className="card-title"><strong>Titolo:</strong> {title}</p>
        {originalTitle && originalTitle !== title && (
          <p className="card-original-title"><strong>Titolo Originale:</strong> {originalTitle}</p>
        )}
        <img
          src={getFlagUrl(language)}
          alt={language}
          className="card-flag"
        />
        <p className="card-vote">
          <strong>Voto:</strong> {renderStars(vote)}
        </p>
        <p className="card-overview">{overview || "No description available"}</p>
      </div>
    </div>
  );
};

export default Card;

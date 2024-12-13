import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GenreFilter.css';

const GenreFilter = ({ onApplyFilters }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
            params: {
              api_key: '2a932018bf9b9741f9754017875f411b',
              language: 'it-IT',
            },
          }),
          axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
            params: {
              api_key: '2a932018bf9b9741f9754017875f411b',
              language: 'it-IT',
            },
          }),
        ]);

        const uniqueGenres = [
          ...movieGenres.data.genres,
          ...tvGenres.data.genres,
        ].reduce((acc, genre) => {
          if (!acc.some((g) => g.id === genre.id)) acc.push(genre);
          return acc;
        }, []);
        console.log(uniqueGenres);
        
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Errore nel caricamento dei generi:', error);
      }
    };

    fetchGenres();
  }, []);

  const toggleAccordion = () => {
    setIsOpen((open) => !open);
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const applyFilters = () => {
    onApplyFilters(selectedGenres);
    setIsOpen(false);
  };

  return (
    <div className="genre-filter">
      <button className="genre-filter-button" onClick={toggleAccordion}>
        Filtra per Genere
      </button>
      {isOpen && (
        <div className="genre-accordion">
          {genres.map((genre) => (
            <label key={genre.id} className="genre-item">
              <input
                type="checkbox"
                value={genre.id}
                onChange={() => handleGenreChange(genre.id)}
                checked={selectedGenres.includes(genre.id)}
              />
              {genre.name}
            </label>
          ))}
          <button className="apply-filters-button" onClick={applyFilters}>
            Applica Filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreFilter;

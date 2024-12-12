import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const ResultsList = () => {
  const { state } = useContext(GlobalContext);

  if (state.loading) return <p>Caricamento in corso...</p>;
  if (state.error) return <p>{state.error}</p>;
  if (state.results.length === 0) return <p>Nessun risultato trovato</p>;

  return (
    <ul>
      {state.results.map((result) => (
        <li key={result.id}>
          <p><strong>Titolo:</strong> {result.title}</p>
          <p><strong>Titolo Originale:</strong> {result.original_title}</p>
          <p><strong>Lingua:</strong> {result.original_language}</p>
          <p><strong>Voto:</strong> {result.vote_average}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;

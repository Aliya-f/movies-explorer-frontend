import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({   allMovies,
  onSavedPage,
  onSaveHandler,
  onDeleteHandler,
  savedMovies,}) {
  
  return (
    <section className="movies-cardlist">
      <ul className='movies-cardlist__container'>
      {allMovies &&
        allMovies.map((movie) => (
            <MoviesCard
            key={movie._id || movie.id}
            onSaveHandler={onSaveHandler}
            onDeleteHandler={onDeleteHandler}
            savedMovies={savedMovies || allMovies}
            onSavedPage={onSavedPage}
            {...movie}
            />
          )) 
          }

      </ul>
    </section>
  );
}

export default MoviesCardList;
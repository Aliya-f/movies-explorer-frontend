import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import {initialCards} from '../../utils/initialCards';
import './MoviesCardList.css';
import Preloader from '../../Preloader/Preloader';
import consistentTypeSpecifierStyle from 'eslint-plugin-import/lib/rules/consistent-type-specifier-style';

function MoviesCardList({   allMovies,
  onSavedPage,
  onSaveHandler,
  onDeleteHandler,
  savedMovies,}) {
  
    // console.log(savedMovies)
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
  
      {/* <Preloader loaderActive={loaderActive}/> */}
        {/* <button type="button" className={!hideMoreButton ? `movies-cardlist__button` : `movies-cardlist__button movies-cardlist__button_dis`} onClick={handleShowMore}>Ещё</button> */}
    </section>
  );
}

export default MoviesCardList;
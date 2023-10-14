import React, { useState, useEffect } from "react";

import './MoviesCard.css'

const baseUrl = 'https://api.nomoreparties.co';

function MoviesCard({   
  onSavedPage,
  savedMovies,
  onSaveHandler,
  onDeleteHandler,
  ...props }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // окрашиваем кнопку лайка, если он фильм нашелся в сохраненных
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  const handleSave = () => {
    // создаем объект фильма для сохранения
    // добавляем дефолтные значения
    const movieData = {
      country: props.country ,
      director: props.director ,
      duration: props.duration,
      year: props.year ,
      description: props.description ,
      image: baseUrl + props.image.url ,
      trailer: props.trailerLink ,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      thumbnail: `https://api.nomoreparties.co${props.image.formats.thumbnail.url}`,
      movieId: props.id,
    };
    onSaveHandler(movieData, setIsSaved);
  };

  const handleDelete = () => {
    onDeleteHandler(props._id || props.id, setIsSaved);
  };

  function getDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours ? `${hours}ч` : ''} ${minutes}м`.trim()
  }

  return (
    <li className="card">
      <div className="card__container">
        <a href={props.trailerLink} target="_blank"><img className="card__image" src={onSavedPage ? props.image : baseUrl + props.image.url} alt={props.nameRU} /></a>
        <div className="card__title-container">
          <h2 className="card__title">{props.nameRU}</h2>

          {!onSavedPage
          ? (<button type="button" 
            onClick={!isSaved ? handleSave : handleDelete} className={isSaved ? 'card__like-button card__like-button_active' : 'card__like-button' }></button>)
          : (<button type="button" onClick={handleDelete} className='card__like-button card__like-button_delete' ></button>)}
        </div>
        <p className="card__subtitle">{getDuration(props.duration)}</p>        
      </div>

    </li>
  );
}

export default MoviesCard;
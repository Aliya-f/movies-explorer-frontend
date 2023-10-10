import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

const baseUrl = 'https://api.nomoreparties.co';

function MoviesCard({   onSavedPage,
  savedMovies,
  onSaveHandler,
  onDeleteHandler,
  ...props }) {
  // const { nameRU, duration, image, isSaved, trailerLink } = movie;
  // const location = useLocation();
  // console.log(movie)
  const [isSaved, setIsSaved] = useState(false);
  // const imageUrl = () => {
  //   if (typeof image === 'object') {
  //     return props.image === null ? `` : `https://api.nomoreparties.co${props.image.url}`;
  //   }
  //   if (typeof image === 'string') {
  //     return props.image;
  //   }
  // } 
// console.log(checkLike)
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
  // условие для удаления с обоих страниц
  // так как ключи в объектах отличаются
  onDeleteHandler(props._id || props.id, setIsSaved);
};
  // const isLiked = () => {
  //   // console.log(checkLike)
  //   return checkLike.some((item) => item.movieId === id)
  // };

  // function handleLike() {
  //   handleLikeClick(id)
  // }

  // function handleDislike() {
  //   if (id) {
  //     handleDislikeClick(id)
  //   } else if (_id) {
  //     handleDislikeClick(_id)
  //   }
  // }

  // function handleClickLike() {
  //   if (isSaved) {
  //     console.log('Удаление карточки');
  //   }
  //   else {
  //     console.log('добавление карточки');
  //   }
  // }
  

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
        {/*  {location.pathname === '/saved-movies' && (
          <button
          type='button'
          className='card__like-button card__like-button_delete'
          onClick={() => handleDislike()}
        />
        )}
        {location.pathname === '/movies' && isSaved && (
          <button
          type='button'
          className='card__like-button card__like-button_active'
          onClick={() => handleDislike()}
        />
        )}
        {location.pathname === '/movies' && !isSaved && (
          <button
          type='button'
          className='card__like-button'
          onClick={() => handleLike()}
        />
        )} */}

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
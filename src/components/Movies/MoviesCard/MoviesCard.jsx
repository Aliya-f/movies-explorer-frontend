import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

// const baseUrl = 'https://api.nomoreparties.co';

function MoviesCard({ moviesSection, nameRU, duration, image, isSaved, id, _id, checkLike, trailerLink, handleLikeClick, handleDislikeClick }) {
  // const { nameRU, duration, image, isSaved, trailerLink } = movie;
  // const location = useLocation();
  // console.log(movie)

  const imageUrl = () => {
    if (typeof image === 'object') {
      return image === null ? `` : `https://api.nomoreparties.co${image.url}`;
    }
    if (typeof image === 'string') {
      return image;
    }
  } 
// console.log(checkLike)


  const isLiked = () => {
    // console.log(checkLike)
    return checkLike.some((item) => item.movieId === id)
  };

  function handleLike() {
    handleLikeClick(id)
  }

  function handleDislike() {
    if (id) {
      handleDislikeClick(id)
    } else if (_id) {
      handleDislikeClick(_id)
    }
  }

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
      <a href={trailerLink} target="_blank"><img className="card__image" src={imageUrl()} alt={nameRU} /></a>
        <div className="card__title-container">
          <h2 className="card__title">{nameRU}</h2>
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

          {!isSaved
          ? (<button type="button" 
            onClick={!isLiked() ? handleLike : handleDislike} className={isLiked() ? 'card__like-button card__like-button_active' : 'card__like-button' }></button>)
          : (<button type="button" onClick={handleDislike} className='card__like-button card__like-button_delete' ></button>)}
        </div>
        <p className="card__subtitle">{getDuration(duration)}</p>        
      </div>

    </li>
  );
}

export default MoviesCard;
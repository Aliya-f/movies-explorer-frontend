import { useLocation } from 'react-router-dom';
import './MoviesCard.css'


function MoviesCard({ movie }) {
  const { name, duration, url, isSaved } = movie;
  const location = useLocation();
  
  function handleClickLike() {
    if (isSaved) {
      console.log('Удаление карточки');
    }
    else {
      console.log('добавление карточки');
    }
  }

  return (
    <li className="card">
      <div className="card__container">
        <img className="card__image" src={url} alt={name} />
        <div className="card__title-container">
          <h2 className="card__title">{name}</h2>
          {location.pathname === '/movies'
          ? (<button type="button" onClick={handleClickLike} className={`card__like-button ${isSaved ? "card__like_button_active" : ""}`}></button>)
          : (<button type="button" onClick={handleClickLike} className='card__like-button card__like-button_delete' ></button>)}
        </div>
        <p className="card__subtitle">{duration} минут</p>        
      </div>
    </li>
  );
}

export default MoviesCard;
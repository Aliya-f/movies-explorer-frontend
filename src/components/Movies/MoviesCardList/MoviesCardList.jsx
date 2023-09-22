import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import {initialCards} from '../../utils/initialCards';
import './MoviesCardList.css';

let step = window.screen.width > 480 ? 7 : 5;

function MoviesCardList({ data }) {
  const [position, setPosition] = React.useState(step);

  function handleSize() {
    const { screen: { width } } = window;
    if (width > 480) step = 7;
    else step = 5;
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__container">
      {data.length
          ? data.map((item) => (
            <MoviesCard
              key={item._id}
              movie={item}
            />
          )) : (<p className="movies-cardlist__alert" >
            Ничего не найдено
          </p>)}
      </ul>
      {data.length > position
        ? (<button type="button" className='movies-cardlist__button'>Ещё</button>)
        : null}
    </section>
  );
}

export default MoviesCardList;
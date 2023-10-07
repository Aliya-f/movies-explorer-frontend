import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import {initialCards} from '../../utils/initialCards';
import './MoviesCardList.css';
import Preloader from '../../Preloader/Preloader';
import consistentTypeSpecifierStyle from 'eslint-plugin-import/lib/rules/consistent-type-specifier-style';

function MoviesCardList({ isSaved, moviesSection, search, slice, handleShowMore, handleLikeClick, checkLike, handleDislikeClick },) {
  // console.log(moviesSection)
  const [hideMoreButton, setHideMoreButton] = React.useState(true);
  const [showSection, setShowSection] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const cardsTableTrue = (showSection ? `movies-cardlist__container movies-cardlist__container_dis` : `movies-cardlist__container`);
  const notFoundTrue = (showMessage ? `movies-cardlist__alert` : `movies-cardlist__alert movies-cardlist__alert_dis`)
  // console.log(moviesSection)
  const filterLength = moviesSection.filter(search).length;
  const sliceLength = moviesSection.filter(search).slice(0, slice).length;
  // const [loaderActive, setLoaderActive] = React.useState(false)

  React.useEffect(() => {
    setHideMoreButton(false);
    setShowSection(false);
    setShowMessage(false);
    // setLoaderActive(false);
    
    if (sliceLength === 0 && moviesSection.length === 0) {
      setShowSection(true)
      setHideMoreButton(true)
      // setLoaderActive(true)
      return; 
    }

    if (sliceLength === 0 && moviesSection.length > 0) {
      setHideMoreButton(true);
      setShowSection(true);
      setShowMessage(true);
      // setLoaderActive(false);
      return;
    }

    if (sliceLength >= filterLength) {
      return setHideMoreButton(true)
    }
  }, [search])

// console.log(checkLike)
  return (
    <section className="movies-cardlist">
      <ul className={cardsTableTrue}>
      {moviesSection.filter(search).slice(0, slice).map((item) => (
            <MoviesCard
              key={item.id || item._id}
              // movie={item}
              isSaved={isSaved}
              
              handleLikeClick={handleLikeClick}
              checkLike={checkLike}
              handleDislikeClick={handleDislikeClick}              
              {...item}
            />
          )) 
          }

      </ul>
      <p className={notFoundTrue} >
        Ничего не найдено
      </p>       
      {/* <Preloader loaderActive={loaderActive}/> */}
        <button type="button" className={!hideMoreButton ? `movies-cardlist__button` : `movies-cardlist__button movies-cardlist__button_dis`} onClick={handleShowMore}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
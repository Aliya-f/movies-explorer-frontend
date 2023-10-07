import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
// import {MainApi} from '../../utils/Api';
import './Movies.css';
// import {initialCards} from '../../utils/initialCards';
// import { MoviesApi } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader"

function Movies({ moviesSection, handleSearch, isLoggedIn, handleLikeClick, checkLike, handleDislikeClick }) {
  const [sizeScreen, setSizeScreen] = React.useState(window.innerWidth);
  const [sliceShow, setSliceShow] = React.useState(() => {
    return 0;
  });
  const [movies, setMovies] = React.useState([]);
  // const movieArray = localStorage.getItem('movieArray');
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [checkboxState, setCheckboxState] = React.useState(false);
  // console.log(movies)
  // function handleSearch() {
  //   if (movies.length >= 1) {
  //     return
  //   } else if (movieArray) {
  //     return setMovies(JSON.parse(movieArray))
  //   } else {
  //     return MoviesApi.getMovies()
  //     .then((data) => {
  //       console.log(data)
  //       localStorage.setItem('movieArray', JSON.stringify(data));
  //       return setMovies(JSON.parse(localStorage.getItem('movieArray')))
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }


  // отрисовка массива карточек
  // React.useEffect(() => {

  //   MoviesApi
  //     .getMovies()
  //       .then((res) => {
  //         // console.log(res)
  //         setMovies(res);
  //       })
  //       .catch((err) => console.log(err));

  // }, []);

// console.log(movies)

  const handleSize = () => {
    setSizeScreen(window.innerWidth)
  }

  const sliceValue = () => {
    if (sizeScreen > 1279) {
      return setSliceShow(16)
    } else if (sizeScreen > 480) {
      return setSliceShow(8)
    } else {
      return setSliceShow(5)
    }
  }

  const showMore = () => {
    if (sizeScreen > 1279) {
      return setSliceShow((prevSliceShow) => prevSliceShow + 4)
    } else if (sizeScreen > 480) {
      return setSliceShow((prevSliceShow) => prevSliceShow + 2)
    } else {
      return setSliceShow((prevSliceShow) => prevSliceShow + 2)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleSize);
    sliceValue()

    return () => {
      window.removeEventListener('resize', handleSize);
    }

  }, [sizeScreen])

  const searchFunc = (data) => {
    return setSearchText(data);
  }

  const checkboxFunc = (boolean) => {
    return setCheckboxState(boolean)
  }

  const searchValue = (value) => {
    const searcOnName = value.nameRU.toLowerCase().includes(searchText.toLowerCase());
    const searchOnDuration = value.duration <= 40;
    
    if (!checkboxState) {
      if (searchText === '') {
        return;
      } else if (searcOnName) {
        return value;
      } 
    } else {
      if (searchText === '') {
        return;
      } else if (searcOnName && searchOnDuration) {
        return value;
      }
    }
  }
  // console.log(moviesSection)

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main>
        <SearchForm startSearch={searchFunc} onSearch={handleSearch} onCheckbox={checkboxFunc} isLoading={isLoading}/>
        <Preloader isLoading={isLoading} />
          <MoviesCardList 
          isSaved={false} 
          moviesSection={moviesSection} 
          slice={sliceShow}
          search={searchValue} 
          handleShowMore={showMore}

          handleLikeClick={handleLikeClick}
          checkLike={checkLike}
          handleDislikeClick={handleDislikeClick}
          />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
// import {initialLikeCards} from '../../utils/initialCards';
import savedPageContext from "../../contexts/saved-page-context";
import Preloader from "../Preloader/Preloader"

function SavedMovies({ moviesSection,  handleSearch, isLoggedIn, handleLikeClick, checkLike, handleDislikeClick }) {
  // const { onSavedPage, setOnSavedPage } = React.useContext(savedPageContext);
  // React.useEffect(() => setOnSavedPage(true), [setOnSavedPage]);
  const [sizeScreen, setSizeScreen] = React.useState(window.innerWidth);
  const [sliceShow, setSliceShow] = React.useState(() => {
    return 0;
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [checkboxState, setCheckboxState] = React.useState(false);

  
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
    // console.log(value.nameRU)
    const searcOnName = value.nameRU.toLowerCase()
    .includes(searchText.toLowerCase());
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
        <Preloader  isLoading={isLoading} />
        <MoviesCardList 
        isSaved={true} 
        moviesSection={moviesSection}
        slice={sliceShow}
        search={searchValue} 
        handleShowMore={showMore}
        // onSavedPage={onSavedPage}

        handleLikeClick={handleLikeClick}
        checkLike={checkLike}
        handleDislikeClick={handleDislikeClick}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
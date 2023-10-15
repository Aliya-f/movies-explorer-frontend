import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import {mainApi} from '../../utils/MainApi';

function SavedMovies({ 
  isLoggedIn,  
  savedMovies,
  setSavedMovies,
  cardErrorHandler, 
  message}) {
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  // стейт сохраненных карточек
  const [moviesForRender, setMoviesForRender] = useState(savedMovies);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState("");
  // console.log(shortFilmsCheck)
  useEffect(() => setMoviesForRender(savedMovies), [savedMovies]);

  // поиск
  const filterMovies = (searchQuery, moviesArray) => {
    return moviesArray.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  // чекбокс
  const findOnlyShorts = (movies) => {
    return movies.filter((movie) => movie.duration < 40);
  };

  useEffect(() => {
    if (message) {
      setNotFound(message);
    }
  }, [message]);

  // удаление карточки
  const deleteMovie = (movieId, likeHandler) => {
    mainApi
      .deleteMovie(movieId, token)
      .then(() => {
        likeHandler(false);
        // удаление карточки из 2х стейтов
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        setMoviesForRender((state) => state.filter((m) => m._id !== movieId));
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  //  поиск сохраненных
  const submitHandler = async (isOnlyShorts, searchQuery) => {
    try {
      setIsLoading(true);
      const filteredMovies = filterMovies(searchQuery, savedMovies);
      const filteredShorts = findOnlyShorts(filteredMovies);

      // чекбокс
      if (isOnlyShorts) {
        setMoviesForRender(filteredShorts);
        if (filteredShorts.length === 0) {
          setNotFound("Ничего не найдено");
        }
      } else {
        setMoviesForRender(filteredMovies);
        if (filteredMovies.length === 0 ) {
          setNotFound("Ничего не найдено");
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  } 

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main>
        <SearchForm             
        submitHandler={submitHandler}
        checkbox={shortFilmsCheck}
        isLoading={isLoading}
        setCheckbox={setShortFilmsCheck}
        onSavedPage={true}/>
        {moviesForRender && !message && (
          <MoviesCardList 
          allMovies={moviesForRender}
          onDeleteHandler={deleteMovie}
          onSavedPage={true}
          />)}
        {moviesForRender.length === 0 && (
          <p className="movies-cardlist__alert">{notFound}</p>
        )}
       
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
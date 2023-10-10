import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import {mainApi} from '../../utils/MainApi';
import './Movies.css';
// import {initialCards} from '../../utils/initialCards';
import { MoviesApi } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader"
import { useWidth } from "../../hooks/useWidth";

function Movies({  isLoggedIn, savedMovies, setSavedMovies, cardErrorHandler}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsAmount, setInitialCards] = useState(0); // первоначальное кол-во карточек
  const [cardsPage, setCardsPage] = useState(0); // доп карточки
  const [cardsInBundle, setCardsInBundle] = useState(0); // количество новых карточек
  const cardsCount = initialCardsAmount + cardsInBundle * cardsPage; // кол-во карточек, которые отобразятся  
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notFound, setNotFound] = useState("");

  const width = useWidth();
  const queryData = localStorage.getItem("queryData");
  // const token = localStorage.getItem("token");
  let allMovies = localStorage.getItem("allMoviesData");

  // количество карточек
  useEffect(() => {
    if (width >= 1280) {
      setInitialCards(16);
      setCardsInBundle(4);
    } else if (width > 480 && width < 1280) {
      setInitialCards(8);
      setCardsInBundle(2);
    } else if (width <= 480) {
      setInitialCards(5);
      setCardsInBundle(2);
    }
  }, [width]);

  let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
  let filteredShorts = JSON.parse(queryData)?.filteredShorts || [];

  // поиск фильмов
  const filterMovies = (searchQuery, moviesArray) => {
    return moviesArray.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // чекбокс
 const findOnlyShorts = (movies) => {
    return movies.filter((movie) => movie.duration < 40);
  };


  // сохраниение подборки фильмов
  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setMovies(filteredShorts.slice(0, cardsCount))
        : setMovies(filteredMovies.slice(0, cardsCount));
    }
  }, [shortFilmsCheck, cardsCount, errorMessage]);

  // сохраниение чекбокса
  useEffect(() => {
    if (queryData) {
      const newQueryData = JSON.parse(queryData);
      newQueryData.isOnlyShorts = shortFilmsCheck;
      localStorage.setItem("queryData", JSON.stringify(newQueryData));
    }
  }, [shortFilmsCheck, queryData]);

  // поиск всех фильмов
  const submitHandler = async (isOnlyShorts, searchQuery) => {
    try {
      setIsLoading(true);
      // достаем массив фильмов фильмы
      if (!allMovies) {
        const allMoviesData = await MoviesApi.getMovies();
        localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
        allMovies = localStorage.getItem("allMoviesData");
      }
      // подборка
      filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
      filteredShorts = findOnlyShorts(filteredMovies);
      // создание объекта для сохранения в localStorage
      const queryData = {
        filteredMovies,
        filteredShorts,
        searchQuery,
        isOnlyShorts,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));
      // отрисовка карточек подборки
      if (isOnlyShorts) {
        // отображаем только первоначальное кол-во карточек, используя slice
        setMovies(filteredShorts.slice(0, initialCardsAmount));
        if (filteredShorts.length === 0) {
          setNotFound("Ничего не найдено");
        }
      } else {
        setMovies(filteredMovies.slice(0, initialCardsAmount));
        if (filteredShorts.length === 0) {
          setNotFound("Ничего не найдено");
        }
      }
      setErrorMessage("");
      setIsLoading(false);
    } catch (e) {
      setMovies([]);
      setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      console.log(e);
      setIsLoading(false);
    }
  };

  // кнопка еще
  const moreButtonHandler = () =>
    setCardsPage((prev) => prev + 1);

  // лайк, добавление фильма
  const saveMovie = (movie, likeHandler) => {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        // после ответа добавляем новый фильм в стейт
        setSavedMovies([...savedMovies, newMovie.data]);
        // меняем кнопку
        likeHandler(true);
      })
      .catch((e) => console.log(e))
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  // поиск лайкнутой карточки
  const cardLiked = (id, array) => {
    const searchItem = array.find((movie) => movie.movieId === id);
    console.log(searchItem)
    return searchItem;
  };
  
  // удаление карточки
  const deleteMovie = (movieId, likeHandler) => {
    console.log(movieId)
    const idInSavedMovies = cardLiked(movieId, savedMovies);
    const savedid = idInSavedMovies._id
    console.log(idInSavedMovies._id)
    mainApi
      .deleteMovie(savedid)
      .then(() => {
        likeHandler(false);
        //удаление карточки из стейта
        return setSavedMovies((state) =>
          state.filter((m) => m._id !== savedid)
        );
      })
      .catch((e) => console.log(e))
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main>
        <SearchForm             
          submitHandler={submitHandler}
          checkbox={shortFilmsCheck}
          setCheckbox={setShortFilmsCheck}
          isLoading={isLoading}/>
        {isLoading ? (
          <Preloader isLoading={isLoading}/>
          ) : (
          <MoviesCardList 
          allMovies={movies}
          savedMovies={savedMovies}
          onSaveHandler={saveMovie}
          onDeleteHandler={deleteMovie}
          onSavedPage={false}
          />)}
          {movies.length < 1 && (
            <p className="movies-cardlist__alert">{errorMessage || notFound}</p>
          )}
          {shortFilmsCheck
            ? cardsCount < filteredShorts.length &&
              !isLoading && <button type="button" className='movies-cardlist__button'  onClick={moreButtonHandler}>Ещё</button> 
            : cardsCount < filteredMovies.length &&
              !isLoading && <button type="button" className='movies-cardlist__button'  onClick={moreButtonHandler}>Ещё</button>
          }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
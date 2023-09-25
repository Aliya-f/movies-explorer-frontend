import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
// import {MainApi} from '../../utils/Api';
import './Movies.css';
import {initialCards} from '../../utils/initialCards';


function Movies() {
  // массив фильмов
  // const [cards, setCards] = React.useState([]);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // // отрисовка массива фильмов
  // React.useEffect(() => {
  //   // const token = localStorage.getItem('JWT');
  //   if (!isLoggedIn) return;
  //     MainApi
  //     .getMovies()
  //     .then((res) => {
  //       // console.log(token)
  //       setCards(res);
  //     })
  //     .catch((err) => console.log(err));

  // }, [isLoggedIn]);

  return (
    <>
      <Header />
      <main>
        <SearchForm />
        <MoviesCardList 
          data={initialCards}
 
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
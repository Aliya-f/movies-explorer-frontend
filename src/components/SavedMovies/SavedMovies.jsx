import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import {initialLikeCards} from '../../utils/initialCards';
import savedPageContext from "../../contexts/saved-page-context";

function SavedMovies() {
  const { onSavedPage, setOnSavedPage } = React.useContext(savedPageContext);
  React.useEffect(() => setOnSavedPage(true), [setOnSavedPage]);

  return (
    <>
      <Header />
      <main>
      <SearchForm />
      <MoviesCardList 
        data={initialLikeCards}
        onSavedPage={onSavedPage}
      />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
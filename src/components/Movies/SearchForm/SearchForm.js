import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
// import '../../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input 
            name="search" 
            type="text" 
            placeholder="Фильм" 
            className="search-form__input"
            required
          />
          <div className="search-form__filter-checkbox-container">         
            <button type="submit" className="search-form__submit-button">Найти</button>
            <div className="search-form__line"></div>
            <div className="filter-checkbox">
              <label htmlFor="filter-checkbox__input" className="filter-checkbox__label">
                <input type="checkbox" name="filter-checkbox" id="filter-checkbox__input" className="filter-checkbox__input" />
                <span className="filter-checkbox__fake-input">
                  <span className="filter-checkbox__fake-circle"></span>
                </span>
              </label>
            </div>
            <p className="filter-checkbox__text">Короткометражки</p>
          </div>
        <FilterCheckbox />
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
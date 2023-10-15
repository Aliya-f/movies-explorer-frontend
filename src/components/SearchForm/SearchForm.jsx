import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ submitHandler, checkbox,
  setCheckbox, lastSearchQuery, isLoading}) {
  const [data, setData] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    // подгрузка данных последнего поиска
    if (lastSearchQuery) {
      setData({ ...data, "search": lastSearchQuery });
    }
  }, [lastSearchQuery, setData, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowError(false);
    setData({ ...data, [name]: value });
  };

  const onClickCheckBox = () => setCheckbox(!checkbox);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowError(false);
    if (data === '') {
      return setShowError(prevShowError => !prevShowError)
    }
    submitHandler(checkbox, data["search"])
  }; 

  return (
    <section className="search-form">
      <div className="search-form__container" >
        <form className="search-form__form" onSubmit={handleSubmit} noValidate>
          <input 
            name="search" 
            type="search" 
            placeholder="Фильм" 
            className="search-form__input"
            value={data["search"] || ""}
            onChange={handleChange}
            
          />
          <div className="search-form__filter-checkbox-container">         
            <button type="submit" className="search-form__submit-button" disabled={isLoading}>Найти</button>
            <span className={showError ? `search-form__error` : `search-form__error search-form__error_disable`}>Нужно ввести ключевое слово</span>
            <div className="search-form__line"></div>
            <div className="filter-checkbox">
              <label htmlFor="filter-checkbox__input" className="filter-checkbox__label">
                <input 
                type="checkbox" 
                name="filter-checkbox" 
                id="filter-checkbox__input" className="filter-checkbox__input" 
                disabled={isLoading}
                checked={checkbox}
                onChange={onClickCheckBox}
                />
                <span className="filter-checkbox__fake-input">
                  <span className="filter-checkbox__fake-circle"></span>
                </span>
              </label>
            </div>
            <p className="filter-checkbox__text">Короткометражки</p>
          </div>
        <FilterCheckbox checkbox={checkbox} setCheckbox={setCheckbox} isLoading={isLoading}/>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

  return (
      <div className="filter-checkbox-mobile">
        <label htmlFor="filter-checkbox-mobile__input" className="filter-checkbox-mobile__label">
          <input type="checkbox" name="filter-checkbox-mobile" id="filter-checkbox-mobile__input" className="filter-checkbox-mobile__input"/>
          <span className="filter-checkbox-mobile__fake-input">
            <span className="filter-checkbox-mobile__fake-circle"></span>
          </span>
          <span className="filter-checkbox-mobile__text">Короткометражки</span>
        </label>
      </div>
  );
}

export default FilterCheckbox;
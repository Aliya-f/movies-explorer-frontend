import React from 'react';
import './ErrorPopup.css';

function ErrorPopup({ errVisible, hideError, errorText }) {
  return (
    <>
      <div onClick={hideError} className={errVisible ? `error-container error-container_active` : `error-container`}>
        <p className="error-container__text">{errorText}</p>
      </div>
    </>
  );
}

export default ErrorPopup;
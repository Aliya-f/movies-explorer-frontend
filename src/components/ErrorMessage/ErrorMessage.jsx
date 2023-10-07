import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ errActive, errHide, errText }) {
  return (
    <>
      <div onClick={errHide} className={errActive ? `error-message error-message_active` : `error-message`}>
        <p className="error-message__text">{errText}</p>
      </div>
    </>
  );
}

export default ErrorMessage;
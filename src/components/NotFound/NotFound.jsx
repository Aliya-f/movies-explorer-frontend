import React from "react";
import { useNavigate } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const nav = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__content">
        <div className="not-found__text">
          <p className="not-found__error">404</p>
          <h2 className="not-found__title">Страница не найдена</h2>
        </div>
        <button type='button' className="not-found__back" onClick={() => nav(-1)}>
          Назад
        </button>
      </div>
    </section>
  );
}

export default NotFound;
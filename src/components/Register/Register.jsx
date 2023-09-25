import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Register.css';

function Register() {

  function login () {
  // document.location.href="/"
  console.log('регистрация')
  }

  return (
    <main>
      <section className="login">
        <div className="login__container">
        <Link to="/" className="login__logo-container"><img src={logo} alt="логотип" className="login__logo"/></Link>
          <h1 className="login__title">Добро пожаловать!</h1>
          <form className="login__form">
          <label htmlFor="name" className="login__label">Имя</label>
            <input 
              name="name" 
              type="text" 
              className="login__input input__name" 
              placeholder="Имя" 
              minLength={2}
              maxLength={30}
              required />
            <span className="login__error" id="name-error">Имя должно быть длиннее 2 и короче 30 символов</span>
            <label htmlFor="email" className="login__label">E-mail</label>
            <input 
              name="email"
              type="email" 
              id="email" 
              className="login__input input__email"
              placeholder="E-mail"
              required
            />
            <span className="login__error" id="email-error">Введите email</span>
            <label htmlFor="password" className="login__label">Пароль</label>
            <input 
              type="password" 
              id="password" 
              className="login__input input__password"
              placeholder="Пароль"
              name="password"
              minLength={4}
              maxLength={30}
              required
            />
            <span className="login__error" id="password-error">Что-то пошло не так...</span>
          </form>
          <button className="login__submit-button" type="submit" onClick={login}>Зарегистрироваться</button>        
          <p className="login__question">Уже зарегистрированы? 
            <Link to="/signin"
            className="login__link">Войти</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
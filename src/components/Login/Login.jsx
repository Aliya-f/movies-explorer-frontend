import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';

function Login() {
  
  function login () {
    document.location.href="/movies"
    console.log('вход')
    }

  return (
    <section className="login">
      <div className="login__container">
      <Link className="login__logo-container" to="/"><img src={logo} alt="logo" className="login__logo"/></Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <label htmlFor="email" className="login__label">E-mail</label>
          <input 
            name="email"
            type="email" 
            id="email" 
            className="login__input"
            required
          />
          <span className="login__error" id="email-error" >Введите email</span>
          <label htmlFor="password" className="login__label">Пароль</label>
          <input 
            type="password" 
            id="password" 
            className="login__input input__password"
            name="password"
            minLength={4}
            maxLength={30}
            required
          />
          <span className="login__error" id="password-error">Что-то пошло не так...</span>
        </form>
        <button className="login__submit-button" type="submit" onClick={login}>Войти</button>        
        <p className="login__question">Ещё не зарегистрированы?
          <Link to="/signup"
          className="login__link">Регистрация</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
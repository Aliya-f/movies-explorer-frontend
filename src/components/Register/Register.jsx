import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../images/logo.svg';
import './Register.css';
import {validateMail, validateName, validatePassword} from '../../hooks/useFormValid';

function Register({ onRegister, isLoggedIn, isSending }) {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: '',
    password: '',
    name: '',
  })
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isNameValid, setNameValid] = React.useState(false)
  const [isMailValid, setMailValid] = React.useState(false);
  const [isPasswordValid, setPasswordValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
    if (name === 'name') {
      setNameValid(validateName(target, name, value));
    } else if (name === 'email') {
      setMailValid(validateMail(target, name, value));
    } else if (name === 'password') {
      setPasswordValid(validatePassword(target, name, value));
    }

    setErrors({
      ...errors, 
      [name]: target.validationMessage,
    });
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setData(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setData, setErrors, setIsValid]
  );

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(data.email, data.password, data.name);
    resetForm()
  }

  React.useEffect(() => {
    if (isMailValid && isPasswordValid && isNameValid) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [isMailValid, isPasswordValid, isNameValid])

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate ('/movies')
    }
  }, [isLoggedIn])

  return (
    <main>
      <section className="login">
        <div className="login__container">
          <div className="login__container_elem">
            <Link to="/" className="login__logo-container"><img src={logo} alt="логотип" className="login__logo"/></Link>
            <h1 className="login__title">Добро пожаловать!</h1>
          </div>
          <form className="login__form" onSubmit={handleSubmit} noValidate>
            <div className='login__inputs'>
              <label className="login__label">Имя</label>
              <input 
              name="name" 
              type="text" 
              className="login__input input__name" 
              placeholder="Имя" 
              minLength={2}
              maxLength={30}
              value={data.name || ''}
              required 
              onChange={handleChange}
              disabled={isSending}
              />
              {isNameValid ? null : <span className="login__error" id="name-error">{errors.name}</span>}
              <label htmlFor="email" className="login__label">E-mail</label>
              <input 
              name="email"
              type="email" 
              id="email" 
              className="login__input input__email"
              placeholder="E-mail"
              value={data.email || ''}
              require
              onChange={handleChange}
              disabled={isSending}
              />
              {isMailValid ? null : <span className="login__error" id="email-error">{errors.email}</span>}
              <label htmlFor="password" className="login__label">Пароль</label>
              <input 
              type="password" 
              id="password" 
              className="login__input input__password"
              placeholder="Пароль"
              name="password"
              minLength={2}
              value={data.password || ''}
              required
              onChange={handleChange}
              disabled={isSending}
              />
               {isPasswordValid ? null : <span className="login__error" id="password-error">{errors.password}</span>}
            </div>
            <div className="login__container_elem">
              <button className={isValid ? "login__submit-button" : "login__submit-button login__submit-button_disabled"}  disabled={!isValid || isSending} type="submit" >Зарегистрироваться</button>        
              <p className="login__question">Уже зарегистрированы? 
                <Link to="/signin" className="login__link">Войти</Link>
              </p>
            </div> 
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
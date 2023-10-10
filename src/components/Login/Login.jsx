import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';
import {validateMail, validatePassword} from '../../hooks/useFormValid';

function Login({ onAuth, isLoggedIn, showError }) {
  const [data, setData] = React.useState({
    password: '',
    email: '',
  })
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isMailValid, setMailValid] = React.useState(false);
  const [isPasswordValid, setPasswordValid] = React.useState(false);
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;

    if (name === 'email') {
      setMailValid(validateMail(target, name, value))
    } else if (name === 'password') {
      setPasswordValid(validatePassword(target, name, value))
    }

    setData({
      ...data,
      [name]: value,
    });
    setErrors({
      ...errors, 
      [name]: target.validationMessage 
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
    onAuth(data.email, data.password);
    resetForm()
  }

  React.useEffect(() => {
    if (isMailValid && isPasswordValid) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [isMailValid, isPasswordValid])

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies')
    }
  }, [isLoggedIn])

  return (
    <main>
      <section className="login">
        <div className="login__container">
          <div className="login__container_elem">
            <Link className="login__logo-container" to="/"><img src={logo} alt="логотип" className="login__logo"/></Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form className="login__form" onSubmit={handleSubmit} noValidate >
              <div className='login__inputs'>
                <label htmlFor="email" className="login__label">E-mail</label>
                <input 
                name="email"
                type="email" 
                id="email" 
                className="login__input"
                placeholder="E-mail"
                minLength='6'
                maxLength='100'
                required
                value={data.email || ''}
                onChange={handleChange}
                />
                {isMailValid ? null : <span className="login__error" id="email-error" >{errors.email}</span>}
                <label htmlFor="password" className="login__label">Пароль</label>
                <input 
                type="password" 
                id="password" 
                className="login__input input__password"
                name="password"
                minLength='2'
                maxLength='30'
                placeholder="Пароль"
                required
                value={data.password || ''}
                onChange={handleChange}
                />
                {isPasswordValid ? null : <span className="login__error" id="password-error">{errors.password}</span>}
              </div>  
              <div className="login__container_elem">
                <button className={isValid ? "login__submit-button" : "login__submit-button login__submit-button_disabled"}type="submit" >Войти</button>     
                <p className="login__question">Ещё не зарегистрированы?
                <Link to="/signup" className="login__link">Регистрация</Link>
                </p>
              </div> 
            </form>
          </div>          
        </div>
      </section>
    </main>
  );
}

export default Login;
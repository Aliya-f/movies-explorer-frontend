import React from "react";
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import "./Profile.css";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import {validateMail, validateName} from '../../hooks/useFormValid';

function Profile({ onEditProfile, isLoggedIn, signOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Стейты, в которых содержится значение инпута
  const [data, setData] = React.useState({
    email: currentUser.email,
    name: currentUser.name,
  })  
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(false)
  const [isMailValid, setIsMailValid] = React.useState(false);
  // console.log(currentUser)
  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setData(currentUser.name, currentUser.email);
    // setEmail(currentUser.email);
  }, [currentUser]);
  
  // Обработчик изменения инпута обновляет стейт
  const handleChange = (event) => {
    const target = event.target
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
    if (name === 'name') {
      setIsNameValid(validateName(target, name, value));
    } else if (name === 'email') {
      setIsMailValid(validateMail(target, name, value));
    }
    setErrors({
      ...errors, 
      [name]: target.validationMessage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    const { email, name } = data;
    onEditProfile({ email, name });
    console.log({ email, name }) // показывает новые данные
  };

  React.useEffect(() => {
    if (isMailValid && isNameValid) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [isMailValid, isNameValid])

  // console.log(currentUser)

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main>
        <section className="profile">
          <div className="profile__container">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form className="profile__form" onSubmit={handleSubmit}>
              <fieldset className="profile__inputs">
                <label className='profile__lable'>Имя</label>
                <input
                  className='profile__input'
                  name="name"
                  type="text"
                  id='name'
                  placeholder="Имя"
                  value={data.name}
                  required
                  onChange={handleChange}
                />
                 {isNameValid ? null : <span className="profile__error" id="name-error" >{errors.name}</span>}
              </fieldset>
              <fieldset className="profile__inputs">
                <label className='profile__lable'>E-mail</label>
                <input
                  className='profile__input'
                  id='email'
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={data.email}
                  required
                  minLength={2}
                  onChange={handleChange}
                />
                 {isMailValid ? null : <span className="profile__error" id="email-error" >{errors.email} </span> }              
              </fieldset>
              <div className='profile__buttons'>

                {isValid ? <button className='profile__edit-btn' type="submit" >Редактировать</button>
                 : <button className='profile__edit-btn profile__edit-btn_disable' type="submit" disabled>Редактировать</button>}
                <Link to='/' className='profile__exit'  onClick={signOut}>Выйти из аккаунта</Link>
              </div>              
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
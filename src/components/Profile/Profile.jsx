import React from "react";
import { Link } from 'react-router-dom';
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  function changeName(e) {
    setName(e.target.value)
  }
  function changeEmail(e) {
    setEmail(e.target.value)
  }

  return (
    <section className="profile">
      <Header />
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <fieldset className="profile__inputs">
            <label htmlFor='name' className='profile__lable'>Имя</label>
            <input
              className='profile__input'
              name="name"
              label="Имя"
              modifier="profile"
              type="text"
              id='name'
              value={name}
              required
              onChange={changeName}
            />
          </fieldset>
          <fieldset className="profile__inputs">
            <label htmlFor='email' className='profile__lable'>E-mail</label>
            <input
              className='profile__input'
              id='email'
              name="email"
              label="E-mail"
              modifier="profile"
              type="email"
              value={email}
              required
              onChange={changeEmail}
            />
          </fieldset>
        </form>
        <div className='profile__buttons'>
          <button className='profile__edit-btn' type="submit">Редактировать</button>
          <Link to='/movies' className='profile__exit'>Выйти из аккаунта</Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;
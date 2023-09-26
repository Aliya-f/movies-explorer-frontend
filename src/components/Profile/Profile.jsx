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
    <>
      <Header />
      <main>
        <section className="profile">
          <div className="profile__container">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form className="profile__form">
              <fieldset className="profile__inputs">
                <label className='profile__lable'>Имя</label>
                <input
                  className='profile__input'
                  name="name"
                  type="text"
                  id='name'
                  placeholder="Имя"
                  value={name}
                  required
                  onChange={changeName}
                />
              </fieldset>
              <fieldset className="profile__inputs">
                <label className='profile__lable'>E-mail</label>
                <input
                  className='profile__input'
                  id='email'
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  required
                  onChange={changeEmail}
                />
              </fieldset>
            </form>
            <div className='profile__buttons'>
              <button className='profile__edit-btn' type="submit">Редактировать</button>
              <Link to='/' className='profile__exit'>Выйти из аккаунта</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
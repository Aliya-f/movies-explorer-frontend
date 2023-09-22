import React from "react";
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import NavTab from '../Main/NavTab/NavTab';
import './Header.css';
import burgerMenu from "../../images/burger-menu.svg";
import closeMenu from "../../images/close-menu.svg";

function Header({ isLoggedIn }) {
  const location = useLocation();
  // мобильное меню хедера
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // хендлер меню 
    function handleClickOpenMobileMenu() {
      // if (isLoggedIn) {
        setIsMobileMenuOpen(!isMobileMenuOpen)
      // }
    }

  const sign = (
    <div className="header__sign-container">
      <Link to="/signup" className="header__signup">Регистрация</Link>
      <Link to="/signin" className="header__signin">Войти</Link>
    </div>
  );

  return (
    <header className={`${location.pathname === '/' ? "header_blue-color" : null} header`}>
      <div className="header__container">
        <Link to='/'>
          <img className="header__logo" src={headerLogo} alt="logo"/>
        </Link>
        {isLoggedIn ? (<NavTab />) : sign}
      </div>
      {isLoggedIn && (
        <button className="header__menu-btn"
          type="button" 
          onClick={handleClickOpenMobileMenu}
          style={{ backgroundImage: `url(${isMobileMenuOpen ? closeMenu : burgerMenu})`
          }}
        />
      )}
      <div className={`mobile-menu ${isMobileMenuOpen && "mobile-menu_type_opened"}`} >
        <ul className="mobile-menu__links">
          <li><Link to="/" className={`${location.pathname === '/' ? "link_type_active" : null} mobile-menu__link`}>Главная</Link></li>
          <li><Link to="/movies" className={`${location.pathname === '/movies' ? "link_type_active" : null} mobile-menu__link`}>Фильмы</Link></li>
          <li><Link to="/saved-movies" className={`${location.pathname === '/saved-movies' ? "link_type_active" : null} mobile-menu__link`}>Сохранённые фильмы</Link></li>
        </ul>
        <Link to="/profile" className="mobile-menu__link">
          <span className="link__text">Аккаунт</span>
          <span className="link__logo"></span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
import React from "react";
import { Link, NavLink, useLocation } from 'react-router-dom';
import './NavTab.css';


function NavTab() {
  const location = useLocation();

  return (
    <>
      <nav className="header__nav-tabs">
        <NavLink 
          className="header__nav-tabs-link" 
          to='/movies'>Фильмы
        </NavLink>
        <NavLink 
          className="header__nav-tabs-link" 
          to='/saved-movies'>Сохранённые фильмы
        </NavLink>
      </nav>
      <Link to="/profile" className="section__profile">
        <span className="section__profile-text">Аккаунт</span>
        <span className={`${location.pathname === '/' ? "section__profile-logo_blue" : "section__profile-logo_dark"} section__profile-logo`}></span>
      </Link>
    </>
  );
}

export default NavTab;
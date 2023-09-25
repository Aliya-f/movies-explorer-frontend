// import { Link, NavLink } from 'react-router-dom';
// import './Navigation.css';

// function Navigation({ isOpen, onClose }) {
//   return (
//     <div className={`burger-menu ${isOpen ? 'burger-menu_active' : ''}`}>
//       <div className="burger-menu__container">
//       <nav className="burger-menu__nav">
//         <Link to="/" className="burger-menu__link">Главная</Link>
//         <NavLink 
//           className="burger-menu__link" 
//           to='/movies'>Фильмы
//         </NavLink>
//         <NavLink 
//           className="burger-menu__link link_type_active" 
//           to='/saved-movies'>Сохранённые фильмы
//         </NavLink>
//       </nav>
//       <Link to="/profile" className="section__profile section__profile_burger-menu">
//         <span className="section__profile-text">Аккаунт</span>
//         <span className="section__profile-logo"></span>
//       </Link>
//       </div>
//       <button className="burger-menu__close-button" onClick={onClose}></button>
//     </div>
//   );
// }
  
//   export default Navigation;
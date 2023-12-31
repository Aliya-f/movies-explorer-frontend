import React from "react";
import { 
  Routes,
  Route, 
  Navigate, 
  // useNavigate 
} from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ProtectedRoute from "../ProtectedRoute.jsx";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from "../NotFound/NotFound";

// import Navigation from '../Navigation/Navigation';
// import PopupWithForm from "./PopupWithForm";
// import ImagePopup from "./ImagePopup";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { api } from "../utils/Api.js";
// import { apiAuth } from "../utils/ApiAuth.js";
// import EditAvatarPopup from "./EditAvatarPopup";
// import EditProfilePopup from "./EditProfilePopup";
// import AddPlacePopup from "./AddPlacePopup";
import Register from "../Register/Register";
import Login from "../Login/Login";
// import InfoTooltip from "./InfoTooltip.jsx";

function App() {
// // попап аватарки
//   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
//   // попап редактирования профиля
//   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
//   // попап добавления карточек
//   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
//   // попап карточки
//   const [selectedCard, setSelectedCard] = React.useState(null);
//   // пользователь
//   const [currentUser, setCurrentUser] = React.useState({});
//   // массив карточек
//   const [cards, setCards] = React.useState([]);
//   // 12: попап успешной регистрации
//   const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
//   // информация о входе
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const [email, setEmail] = React.useState('');
//   // попап модального окна,который информирует пользователя об успешной (или не очень) регистрации
//   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
//   // хук
//   const navigate = useNavigate();

//   // отрисовка массива карточек и инфо пользователя
//   React.useEffect(() => {
//     if (!isLoggedIn) return;
//     api
//       .getUserInfo()
//       .then((data) => {
//         setCurrentUser(data);
//       })
//       .catch((err) => console.log(err));

//     api
//       .getInitialCards()
//       .then((res) => {
//         setCards(res);
//       })
//       .catch((err) => console.log(err));
//   }, [isLoggedIn]);

//   // попапы аватарки, профиля, добавления карточки, открытия карточки
//   function handleEditAvatarClick() {
//     setIsEditAvatarPopupOpen(true);
//   }
//   function handleEditProfileClick() {
//     setIsEditProfilePopupOpen(true);
//   }
//   function handleAddPlaceClick() {
//     setIsAddPlacePopupOpen(true);
//   }
//     function handleCardClick(card) {
//     setSelectedCard(card);
//   }
//   // закрыть попапы
//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setIsEditAvatarPopupOpen(false);
//     setSelectedCard(null);
//     setIsInfoTooltipOpen(false);
//   }
//   // удалить карточку
//   function handleCardDelete(id) {
//     api
//       .deleteCard(id)
//       .then(() => setCards((state) => state.filter((item) => item._id !== id)))
//       .catch((err) => console.log(err));
//   }
//   // лайк
//   function handleCardLike({ likes, _id }) {
//     // Снова проверяем, есть ли лайк
//     const isLiked = likes.some((i) => i._id === currentUser._id);
//     // Отправляем запрос в API и получаем обновлённые данные карточки
//     api
//       .changeLikeCardStatus(_id, isLiked)
//       .then((newCard) => {
//         setCards((state) => state.map((c) => (c._id === _id ? newCard : c)));
//       })
//       .catch((err) => console.log(err));
//   }

//   function handleUpdateUser(data) {
//     api
//       .setUserInfo(data)
//       .then((res) => {
//         setCurrentUser(res);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err));
//   }
//   // обновить аватар
//   function handleUpdateAvatar(data) {
//     api
//       .setAvatar(data)
//       .then((res) => {
//         setCurrentUser(res);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err));
//   }
//   // добавить карточки
//   function handleAddPlaceSubmit(data) {
//     api
//       .createCard(data)
//       .then((newCard) => {
//         setCards([newCard, ...cards]);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err));
//   }
//   // 12: регистрация
//   function handleRegister(email, password) {
//     apiAuth
//       .signUp({ email, password })
//       .then((data) => {
//         if (data) {
//           setIsInfoTooltipSuccess(true); // успешный вход
//           navigate("/sign-in")
//         }
//       })
//       .catch((err) => {
//         console.log(err)
//         setIsInfoTooltipSuccess(false)
//       })
//       .finally(() => setIsInfoTooltipOpen(true));
//   }
//   // аутентификация
//   function handleLogin(email, password) {
//     apiAuth
//       .signIn({ email, password })
//       .then((data) => {
//         if (data.token) {
//           setEmail(email);
//           setIsLoggedIn(true)
//           localStorage.setItem('JWT', data.token);
//           navigate("/")
//         }
//       })
//       .catch((err) => {
//         setIsInfoTooltipSuccess(false); // fail
//         setIsInfoTooltipOpen(true); // в любом случае открываем попап
//         console.log(err);
//       });
//   }
//   // проверка токена
//   React.useEffect(() => {
//     const token = localStorage.getItem('JWT');
//       if (token)
//       {
//         apiAuth
//         .checkToken(token)
//         .then((data) => {
//           if (data) {
//             setIsLoggedIn(true); // вошли
//             setEmail(data.data.email); // получаем почту
//             navigate("/"); // перебрасываем в профиль
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   }, []);
//   // удаление токена
//   function onSignOut() {
//     localStorage.removeItem('JWT');
//     setIsLoggedIn(false);
//     setEmail("");
//     navigate("/sign-in");
//   }

//   React.useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/');
//     }
//   }, [isLoggedIn, navigate]);

  return (
    // <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
        <Route path="/" element={
          <>
            <Header isLoggedIn={isLoggedIn}/>
            <Main />
            <Footer />
          </>
        } />
        {!isLoggedIn ? (
          <>
            <Route
              path="/signup" 
              element={
                <Register isLoggedIn={isLoggedIn}/>}
            />
            <Route 
              path="/signin"
              element={
                <Login isLoggedIn={isLoggedIn}/>} 
            />
          </>)
        : null}
        <Route
          path='/movies'
          element={<Movies />}
          isLoggedIn={isLoggedIn}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies />}
          isLoggedIn={isLoggedIn}
        />
        <Route
          path='/profile'
          element={<Profile/>}
          isLoggedIn={isLoggedIn}
        />
        <Route
          path='/404'
          element={<NotFound/>}
        />
        <Route path="*" element={<Navigate to='/404' replace />}/>

        
        {/* <Route path="/signup" element={<Register onRegister={handleRegister} isLoggedIn={isLoggedIn} />} />
          <Route path="/signin" element={<Login onAuth={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} /> */}
        </Routes>
      </div>
    // </CurrentUserContext.Provider>
  );
}

export default App;
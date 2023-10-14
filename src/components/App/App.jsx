import React from "react";
import { 
  Routes,
  Route, 
  Navigate, 
  useNavigate 
} from 'react-router-dom';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute.jsx";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';
import ErrorPopup from '../ErrorPopup/ErrorPopup.jsx';

// import Preloader from "../Preloader/Preloader";
import Register from "../Register/Register";
import Login from "../Login/Login";
// import InfoTooltip from "./InfoTooltip.jsx";
// import { MoviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  // const [movies, setMovies] = React.useState([]);
  const [isErrorMessageOpen, setErrorMessageOpen] = React.useState(false);
  const [ErrorMessageText, setErrorMessageText] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [isRequestSending, setIsRequestSending] = React.useState(false);
  const token = localStorage.getItem("token");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesMessage, setSavedMoviesMessage] = React.useState("");

  function handleErrorTimer() {
    setTimeout(() => {
      setErrorMessageOpen(false)
    }, 6000)
  }
  function showError(text) {
    setErrorMessageOpen(true);
    setErrorMessageText(text);
    handleErrorTimer();
  }

  // регистрация
  function handleRegister (email, password, name) {
    setIsRequestSending(true);
    return mainApi
      .signUp({email, password, name})
      .then(() => {
        handleLogin(email, password);
        navigate('/movies');
      })
      .catch(() => {
        showError('При регистрации возникла ошибка');
      })
      .finally(() => setIsRequestSending(false));
  }
  // аутентификация
  function handleLogin (email, password) {
    setIsRequestSending(true);
    return mainApi
      .signIn({ email, password})
      .then((res) => {
        localStorage.setItem('JWT', res.token);
        console.log(res.token) // токен приходит
        // api._token = res.token;
        setEmail(email);
        setIsLoggedIn(true)
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        showError('Неправильная почта или пароль');
      })
      .finally(() => {
        setIsRequestSending(false);
      });
  }

  // получение инфо пользователя
  React.useEffect(() => {
    // const token = localStorage.getItem('JWT');
    if (!isLoggedIn) return;

      // console.log(token) // токен из хранилища приходит
    mainApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  // проверка токена
  React.useEffect(() => {
    const token = localStorage.getItem('JWT');
      if (token)
      {
        mainApi
        .checkToken(token)
        .then((data) => {
          
          if (data) {
            setIsLoggedIn(true); // вошли
            setEmail(data.email); // получаем почту
            setCurrentUser(data)
            // navigate("/movies"); // перебрасываем в профиль
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // редактировать профиль
  function handleEditProfile(data) {
    setIsRequestSending(true);

    return mainApi
    .setUserInfo(data)
    .then((data) => {
      // console.log(data) //указанные данные выводит
      // console.log(data) // выводятся прежние данные, не изменяя
      setCurrentUser(data);
      showError('Данные успешно изменены!');
    })
    .catch((e) => {
      console.log(e)
      showError('Произошла ошибка! Повторите попытку');
    })
    .finally(() => setIsRequestSending(false));
  }

  // выход, удаление токена
  function onSignOut() {
    localStorage.removeItem('JWT');
    setIsLoggedIn(false);
    localStorage.removeItem('movieArray');
    localStorage.removeItem('SearchHistory');
    localStorage.removeItem('queryData');
    localStorage.removeItem('allMoviesData');
    setCurrentUser({
      name: "",
      email: "",
    })
  }

  // получаем список фильмов, сохраненных пользователем
  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData.data);

        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentUser._id, setSavedMovies, token, isLoggedIn]);

  // console.log(savedMovies)

  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
                <Register isLoggedIn={isLoggedIn} onRegister={handleRegister} isLoading={isLoading} />}
            />
            <Route 
              path="/signin"
              element={
                <Login isLoggedIn={isLoggedIn} onAuth={handleLogin} isLoading={isLoading} />} 
            />
          </>)
        : null}
        <Route
          path='/movies'
          element={
            <ProtectedRoute
            element={Movies }
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}

            />}
        />
        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute
            element={SavedMovies }
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}

            />}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
            element={Profile}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            signOut={onSignOut}
            onEditProfile={handleEditProfile} 
            isSending={isRequestSending}
            />}
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

        <ErrorPopup errVisible={isErrorMessageOpen} errorText={ErrorMessageText}/>
        {/* <Preloader active={''}/> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
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
import Register from "../Register/Register";
import Login from "../Login/Login";
import { mainApi } from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const [isErrorMessageOpen, setErrorMessageOpen] = React.useState(false);
  const [ErrorMessageText, setErrorMessageText] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [isRequestSending, setIsRequestSending] = React.useState(false);
  const token = localStorage.getItem("token");
  const [savedMovies, setSavedMovies] = React.useState([]);
  
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
        setIsLoggedIn(true)
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
        showError('Неправильная почта или пароль');
      })
      .finally(() => {
        setIsLoading(false);
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
      if (!token) {
      setIsLoading(false);
      } else {
        mainApi
        .checkToken(token)
        .then((data) => {
          
          if (data) {
            setIsLoggedIn(true); // вошли
            setCurrentUser(data)
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  // редактировать профиль
  function handleEditProfile(data) {
    setIsRequestSending(true);

    return mainApi
    .setUserInfo(data)
    .then((data) => {
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
  
  return (

    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={
          <>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </>
        } />
        {!isLoggedIn ? (
          <>
            <Route
              path="/signup" 
              element={
                <Register isLoggedIn={isLoggedIn} onRegister={handleRegister} isSending={isRequestSending} />}
            />
            <Route 
              path="/signin"
              element={
                <Login isLoggedIn={isLoggedIn} onAuth={handleLogin} isSending={isRequestSending} />} 
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
            isLoading={isLoading}
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
            isLoading={isLoading}
            />}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
            element={Profile}
            isLoggedIn={isLoggedIn}
            signOut={onSignOut}
            onEditProfile={handleEditProfile} 
            isSending={isRequestSending}
            isLoading={isLoading}
            />}
        />
        <Route
          path='/404'
          element={<NotFound/>}
        />
        <Route path="*" element={<Navigate to='/404' replace />}/>
      </Routes>
      <ErrorPopup errVisible={isErrorMessageOpen} errorText={ErrorMessageText}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
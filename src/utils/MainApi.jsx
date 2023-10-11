class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // проверка на ошибки
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // проверка токена
  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json*",
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`
      }
    }).then((res) => this._checkResponse(res));
  }

  // авторизация
  signIn({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
      .then(this._checkResponse);
  }

  // логаут
  // logout() {
  //   return fetch(`${this._baseUrl}/signout`, {
  //     method: 'POST',
  //     credentials: 'include',
  //   })
  //   .catch((err) => Promise.reject(`Ошибка: ${err.status}`));
  // }
  // регистрация
  signUp({email, password, name}) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    }).then(this._checkResponse);
  }

  // данные профиля
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers:  {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        Accept: "*/*"
      },
    })
      .then(this._checkResponse);
  }

  // редактировать данные профиля
  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('JWT')}`
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse);
  }

  // отрисовка сохраненных фильмов
  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  // добавление фильма
  addMovie(movieInfo) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
      body: JSON.stringify({
        ...movieInfo,
      })
    })
      .then(this._checkResponse);
  }
  // удаление фильма
  deleteMovie(_id) {
    return fetch(`${this.baseUrl}/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('JWT')}`
      },
    })
    .then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'api.moviesproject.nomoredomainsicu.ru'
});
class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error${res.status}`);
  }

    // отрисовка массива фильмов
  getMovies() {
    return fetch(`${this.baseUrl}`, {
      headers: this.headers,
      method: 'GET',
    })
    .then(this._response);
  }
}

export const MoviesApi = new Api({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});
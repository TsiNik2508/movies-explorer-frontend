export default class MainApi {
  constructor() {
    this._link = 'https://movie.tsinik.api.nomoredomainsmonster.ru/';
    this._headers = {
      "Content-Type": "application/json",
    };
    this._movieUrl = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  createUser = ({ name, email, password }) => {
    return fetch(`${this._link}signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    })
    .then((res) => this._checkResult(res));
  };

  login = ({ email, password }) => {
    return fetch(`${this._link}signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkResult(res));
  };

  updateUser(formValues) {
    return fetch(`${this._link}users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
      }),
    })
    .then((res) => this._checkResult(res));
  }

  checkToken = (jwt) => {
    return fetch(`${this._link}users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => this._checkResult(res));
  };

  saveMovie(data) {
    return fetch(`${this._link}movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        director: data.director,
        country: data.country,
        year: data.year,
        duration: data.duration,
        description: data.description,
        trailerLink: data.trailerLink,
        image: `${this._movieUrl}${data.image.url}`,
        thumbnail: `${this._movieUrl}${data.image.url}`,
      }),
    })
    .then((res) => this._checkResult(res));
  }

  getSaveMovies() {
    return fetch(`${this._link}movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    .then((res) => this._checkResult(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this._link}movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then((res) => this._checkResult(res));
  }
}

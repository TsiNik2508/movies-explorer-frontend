export default class MoviesApi {
  constructor() {
    this._link = 'https://api.nomoreparties.co/beatfilm-movies';
    this._headers = {
      "Content-Type": "application/json",
    };
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getMoviesList() {
    return fetch(`${this._link}`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkResult(res));
  }
}
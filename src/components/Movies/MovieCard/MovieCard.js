import { useLocation } from "react-router-dom";

import "./MovieCard.css";



const MoviesCard = ({ movie, onChangeMovieSave, isSaved }) => {
  const { pathname } = useLocation();

  let buttnText;

  function handleToggleSavingMovie() {
    if (typeof onChangeMovieSave === "function") {
      onChangeMovieSave(pathname === "/saved-movies" ? movie._id : movie);
    } else {
    }
  }

  if (pathname === "/saved-movies") {
    buttnText = "×";
    movie.thumbnail = `${"https://api.nomoreparties.co"}/uploads/thumbnail_${
      movie.image.split(
        `${"https://api.nomoreparties.co"}/beatfilm-movies/uploads/`
      )[1]
    }`;

  } else if (pathname === "/movies") {
    isSaved(movie) ? (buttnText = "✓") : (buttnText = "Сохранить");
    movie.thumbnail =
      "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url;
  }

  function movieTime() {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <article className="movie-card">
      <div className="movie-card__container">
        <h3 className="movie-card__title">{movie.nameRU}</h3>
        <span className="movie-card__duration">{movieTime()}</span>
      </div>
      <a
        className="movie-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={movie.thumbnail}
          alt={movie.nameRU}
        />
      </a>
      <button
        onClick={handleToggleSavingMovie}
        className={`movie-card__button ${
          pathname === "/movies" && isSaved(movie)
            ? "movie-card__button_saved"
            : ""
        }`}
      >
        {buttnText}
      </button>
    </article>
  );
};

export default MoviesCard;

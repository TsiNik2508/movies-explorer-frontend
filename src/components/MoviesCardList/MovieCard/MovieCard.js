import React from "react";
import { useLocation } from "react-router-dom";
import { API_MOVIES_LINK } from "../../../utils/constans/constans";

import "./MovieCard.css";

const MoviesCard = ({ movie, onChangeMovieSave, isSaved }) => {
  const { pathname } = useLocation();

  let buttonText;

  function handleToggleSavingMovie() {
    if (typeof onChangeMovieSave === "function") {
      onChangeMovieSave(pathname === "/saved-movies" ? movie._id : movie);
    }
  }

  if (pathname === "/saved-movies") {
    buttonText = "×";
    movie.thumbnail = `${API_MOVIES_LINK}/uploads/thumbnail_${movie.image.split(`${API_MOVIES_LINK}/beatfilm-movies/uploads/`)[1]}`;
  } else if (pathname === "/movies") {
    buttonText = isSaved(movie) ? "✓" : "Сохранить";
    movie.thumbnail = `${API_MOVIES_LINK}${movie.image.formats.thumbnail.url}`;
  }

  function movieTime() {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return `${hours}ч ${minutes}м`;
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
        {buttonText}
      </button>
    </article>
  );
};

export default MoviesCard;

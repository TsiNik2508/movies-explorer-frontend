import { useLocation } from "react-router-dom";
import { useState } from "react";

import "./MovieCard.css";

const MoviesCard = ({ title, duration, thumbnail }) => {
  const { pathname } = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  let buttnText;

  function toggleSavingMovie() {
    setIsSaved(!isSaved);
  }

  if (pathname === "/saved-movies") {
    buttnText = "×";
  } else if (pathname === "/movies") {
    isSaved ? (buttnText = "✓") : (buttnText = "Сохранить");
  }

  function movieTime() {
    if (!duration || typeof duration !== 'string') {
      return 'Некорректный формат времени';
    }
  
    const timeArray = duration.split(' ');
    if (timeArray.length !== 2) {
      return 'Некорректный формат времени';
    }
  
    const hours = parseInt(timeArray[0], 10) || 0;
    const minutes = parseInt(timeArray[1], 10) || 0;
  
    return hours + "ч " + minutes + "м";
  }
  

  return (
    <article className="movie-card">
      <div className="movie-card__container">
        <h3 className="movie-card__title">{title}</h3>
        <span className="movie-card__duration">{movieTime()}</span>
      </div>
      <img className="movie-card__image" src={thumbnail} alt={title} />
      <button
        onClick={toggleSavingMovie}
        className={`movie-card__button ${
          isSaved && pathname === "/movies" ? "movie-card__button_saved" : ""
        }`}
      >
        {buttnText}
      </button>
    </article>
  );
};

export default MoviesCard;

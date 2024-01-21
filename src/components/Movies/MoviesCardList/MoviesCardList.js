import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MovieCard/MovieCard";
import More from "./Utils/Utils";
import "./MoviesCardList.css";
import MovieImg from '../../../images/Movie.png';

const MoviesCardList = () => {
  const [shownMovies, setShownMovies] = useState(12);
  const [moviesToAdd, setMoviesToAdd] = useState(3);
  const [loadIndex, setLoadIndex] = useState(shownMovies);

  const location = useLocation();

  const resizeWindow = () => {
    if (window.innerWidth >= 1024) {
      setShownMovies(12);
      setMoviesToAdd(3);
    } else if (window.innerWidth >= 768) {
      setShownMovies(8);
      setMoviesToAdd(2);
    } else {
      setShownMovies(5);
      setMoviesToAdd(2);
    }
  };

  useEffect(() => {
    resizeWindow();

    const handleResize = () => {
      setTimeout(() => {
        resizeWindow();
        setLoadIndex(shownMovies);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [shownMovies]);

  function showMore() {
    if (loadIndex < moviesArray.length) {
      setLoadIndex(loadIndex + moviesToAdd);
    }
  }

  const moviesArray = Array.from({ length: 8 }, () => ({
    name: 'В погоне за Бенкси',
    duration: '0ч 45мин',
    thumbnail: MovieImg,
  }));

  const savedMovies = location.pathname === "/saved-movies" ? moviesArray.slice(0, 3) : moviesArray;

  return (
    <div>
      <ul className="movies-card-list">
        {savedMovies.slice(0, loadIndex).map((movie, index) => (
          <li className="movies-card-list__item" key={index}>
            <MoviesCard
              title={movie.name}
              duration={movie.duration}
              thumbnail={movie.thumbnail}
            />
          </li>
        ))}
      </ul>
      {loadIndex < savedMovies.length && <More showMore={showMore} />}
    </div>
  );
};

export default MoviesCardList;

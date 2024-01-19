import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MovieCard/MovieCard";
import More from "./Utils/Utils";
import "./MoviesCardList.css";
import MovieImg from '../../../images/Movie.png';

const MoviesCardList = () => {
  let shownMovies = 12;
  let moviesToAdd = 2;

  const resizeWindow = () => {
    if (window.innerWidth >= 1024) {
      shownMovies = 12;
      moviesToAdd = 3;
    } else if (window.innerWidth >= 768) {
      shownMovies = 8;
      moviesToAdd = 2;
    } else {
      shownMovies = 5;
      moviesToAdd = 2;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      resizeWindow();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [loadIndex, setLoadIndex] = useState(shownMovies);

  const location = useLocation();

  function showMore() {
    if (loadIndex < shownMovies) {
      setLoadIndex(loadIndex + moviesToAdd);
    }
  }

  const movies = Array.from({ length: 8 }, () => ({
    name: 'В погоне за Бенкси',
    duration: '0ч 45мин',
    thumbnail: MovieImg,
  }));

  const savedMovies = location.pathname === "/saved-movies" ? movies.slice(0, 3) : movies;

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
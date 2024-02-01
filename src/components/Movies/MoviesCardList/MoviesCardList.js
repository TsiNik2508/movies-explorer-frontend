import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MovieCard/MovieCard";
import More from "./More/More";
import "./MoviesCardList.css";

const MoviesCardList = ({
  isSaved,
  moviesArray,
  saveMoviesArray,
  nothingFound,
  onSaveMovie,
  deleteMovie,
}) => {
  const [shownMovies, setShownMovies] = useState(0);
  const [moviesToAdd, setMoviesToAdd] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const resizeWindow = () => {
      setWidth(window.innerWidth);
    };

    if (location.pathname === "/movies") {
      if (width >= 1024) {
        setShownMovies(12);
        setMoviesToAdd(3);
      } else if (width >= 576) {
        setShownMovies(8);
        setMoviesToAdd(2);
      } else {
        setShownMovies(5);
        setMoviesToAdd(2);
      }
    }

    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [window.innerWidth, location, moviesArray]);

  function showMore() {
    setShownMovies((shownMovies) => shownMovies + moviesToAdd);
  }

  return (
    <Fragment>
      {location.pathname === "/saved-movies" &&
        (saveMoviesArray.length ? (
          <ul className="movies-card-list">
            {saveMoviesArray.map((saveMovie) => {
              return (
                <li className="movies-card-list__item" key={saveMovie._id}>
                  <MoviesCard
                    movie={saveMovie}
                    onChangeMovieSave={deleteMovie}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          nothingFound && (
            <p className="movies-card-list__error">
              Ничего не найдено
            </p>
          )
        ))}

      {location.pathname === "/movies" && (
        <Fragment>
          {moviesArray.length ? (
            <ul className="movies-card-list">
              {moviesArray.slice(0, shownMovies).map((searchedMovie) => {
                return (
                  <li className="movies-card-list__item" key={searchedMovie.id}>
                    <MoviesCard
                      movie={searchedMovie}
                      onChangeMovieSave={onSaveMovie}
                      isSaved={isSaved}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            nothingFound && (
              <p className="movies-card-list__error">
                Ничего не найдено
              </p>
            )
          )}
          {shownMovies < moviesArray.length && <More showMore={showMore} />}
        </Fragment>
      )}
    </Fragment>
  );
};

export default MoviesCardList;

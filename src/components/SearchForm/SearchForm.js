import { useEffect, useState } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";

const SearchForm = ({
  shortMovieCheck,
  onSearchMovie,
  onChooseShortMovies,
}) => {
  const location = useLocation();
  const [movieToSearch, setMovieToSearch] = useState("");

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setMovieToSearch("");
    } else {
      const previousMovieToSearch = JSON.parse(
        localStorage.getItem("movie-to-search")
      );
      setMovieToSearch(previousMovieToSearch);
    }
  }, [location.pathname]);

  const handlSubmit = (e) => {
    e.preventDefault();
    onSearchMovie(movieToSearch);
  };

  const handleOnChange = (e) => {
    setMovieToSearch(e.target.value);
  };

  const handleChooseMovieDuration = () => {
    onChooseShortMovies(movieToSearch);
  };

  return (
    <form onSubmit={handlSubmit} className="search-form">
      <label htmlFor="movie" className="search-form__label">
        <input
          className="search-form__input"
          value={movieToSearch ?? ""}
          onChange={handleOnChange}
          id="movie"
          type="text"
          placeholder="Фильм"
          name="movie"
        />
        <span className="search-form__input-error"></span>
      </label>
      <button className="search-form__button" type="submit">
        Поиск
      </button>

      <label
        className="search-form__checkbox-label"
        htmlFor="search-form-checkbox"
      >
        <input
          className="search-form__checkbox"
          id="search-form-checkbox"
          onChange={handleChooseMovieDuration}
          checked={shortMovieCheck && "checked"}
          name="checkbox"
          type="checkbox"
        ></input>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
};

export default SearchForm;

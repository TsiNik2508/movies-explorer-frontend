import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

import "./Movies.css";

const Movies = ({
  moviesArray,
  nothingFound,
  onSaveMovie,
  isSaved,
  onSearchMovie,
  onChooseShortMovies,
  shortMovieCheck,
  isPreloader,
}) => {
  return (
    <section className="movies">
      <SearchForm
        shortMovieCheck={shortMovieCheck}
        onChooseShortMovies={onChooseShortMovies}
        onSearchMovie={onSearchMovie}
      />
      {isPreloader && <Preloader />}
      <MoviesCardList
        isSaved={isSaved}
        onSaveMovie={onSaveMovie}
        nothingFound={nothingFound}
        moviesArray={moviesArray}
      />
    </section>
  );
};

export default Movies;
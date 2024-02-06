import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SaveMovies = ({
  nothingFound,
  onChooseShortMovies,
  savedShortMovieCheck,
  saveMoviesArray,
  deleteMovie,
  onSearchMovie,
}) => {
  return (
    <section className="movies">
      <SearchForm
        shortMovieCheck={savedShortMovieCheck}
        onChooseShortMovies={onChooseShortMovies}
        onSearchMovie={onSearchMovie}
      />
      <MoviesCardList
        deleteMovie={deleteMovie}
        nothingFound={nothingFound}
        saveMoviesArray={saveMoviesArray}
      />
    </section>
  );
};

export default SaveMovies;
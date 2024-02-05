import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

const SaveMovies = ({
  nothingFound,
  onChooseShortMovies,
  savedShortMoviesCheck,
  saveMoviesArray,
  deleteMovie,
  onSearchMovie,
}) => {
  return (
    <section className="movies">
      <SearchForm
        shortMoviesCheck={savedShortMoviesCheck}
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
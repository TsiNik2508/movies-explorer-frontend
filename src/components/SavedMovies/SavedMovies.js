import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SaveMovies = ({
  notFound,
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
        notFound={notFound}
        saveMoviesArray={saveMoviesArray}
      />
    </section>
  );
};

export default SaveMovies;
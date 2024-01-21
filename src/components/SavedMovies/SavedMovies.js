import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList/>
    </section>
  );
};

export default SavedMovies;
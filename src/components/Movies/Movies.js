import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoviesCard from "./Preloader/Preloader";

import "./Movies.css";

const Movies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList MoviesCard={MoviesCard} />
    </section>
  );
};

export default Movies;
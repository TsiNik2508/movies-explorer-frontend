import "./SearchForm.css";

const SearchForm = (props) => {
  return (
    <form className="search-form">
      <label htmlFor="movie" className="search-form__label">
        <input
          className="search-form__input"
          id="movie"
          type="text"
          required
          name="movie"
          placeholder="Фильмы"
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
          name="checkbox"
          type="checkbox"
        ></input>
        <span className="search-form__checkbox-text">Короткометражки</span>
      </label>
    </form>
  );
};

export default SearchForm;
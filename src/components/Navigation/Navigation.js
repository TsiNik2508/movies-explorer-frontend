import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  let [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const mainMatch = useMatch("/");
  const moviesMatch = useMatch("/movies");
  const savedMoviesMatch = useMatch("/saved-movies");
  const profileMatch = useMatch("/profile");

  const { pathname } = useLocation();

  function toggleBurgerState() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  function handleCloseOverlay(e) {
    if (!e.target.classList.contains("nav")) {
      toggleBurgerState();
    }
  }

  return isLoggedIn ? (
    <div
      onClick={handleCloseOverlay}
      className={`nav-wrap ${isBurgerMenuOpen ? "nav-wrap_cover" : ""}`}
    >
      <nav
        className={`nav nav_logged
        ${isBurgerMenuOpen ? "nav_logged-open" : ""}
        ${pathname !== "/" ? "" : "nav_logged-main"}`}
      >
        <NavLink
          className={`nav__link nav__link_is-logged nav__link_main ${
            mainMatch && "nav__link_active"
          }`}
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className={`nav__link nav__link_is-logged ${
            moviesMatch && "nav__link_active"
          }`}
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className={`nav__link nav__link_is-logged ${
            savedMoviesMatch && "nav__link_active"
          }`}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          className={`nav__link nav__link_is-logged nav__link_profile ${
            profileMatch && "nav__link_active"
          }`}
          to="/profile"
        >
          Аккаунт
        </NavLink>
      </nav>
      <div
        onClick={toggleBurgerState}
        className={`nav__burger ${
          isBurgerMenuOpen ? "nav__burger_opened" : ""
        }`}
      >
        {!isBurgerMenuOpen ? <span className="nav__burger-line"></span> : <></>}
      </div>
    </div>
  ) : (
    <nav className="nav">
      <NavLink className="nav__link nav__link_signup" to="/signup">
        Регистрация
      </NavLink>
      <NavLink className="nav__link nav__link_signin" to="/signin">
        Войти
      </NavLink>
    </nav>
  );
};

export default Navigation;
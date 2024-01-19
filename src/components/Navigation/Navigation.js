import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  let [isLoginOpen, setIsLoginOpen] = useState(false);

  const mainMatch = useMatch("/");
  const moviesMatch = useMatch("/movies");
  const savedMoviesMatch = useMatch("/saved-movies");
  const profileMatch = useMatch("/profile");

  const { pathname } = useLocation();

  function toggleUnlogState() {
    setIsLoginOpen(!isLoginOpen);
  }

  function handleCloseOverlay(e) {
    if (!e.target.classList.contains("nav")) {
      toggleUnlogState();
    }
  }

  return isLoggedIn ? (
    <div
      onClick={handleCloseOverlay}
      className={`nav-wrap ${isLoginOpen ? "nav_cover" : ""}`}
    >
      <nav
        className={`nav nav_login
        ${isLoginOpen ? "nav_login-open" : ""}
        ${pathname !== "/" ? "" : "nav_login-main"}`}
      >
        <NavLink
          className={`nav__link nav__link_logged nav__link_main ${
            mainMatch && "nav__link_active"
          }`}
          to="/"
        >
          Главная
        </NavLink>
        <NavLink
          className={`nav__link nav__link_logged ${
            moviesMatch && "nav__link_active"
          }`}
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className={`nav__link nav__link_logged ${
            savedMoviesMatch && "nav__link_active"
          }`}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </NavLink>
        <NavLink
          className={`nav__link nav__link_logged nav__link_profile ${
            profileMatch && "nav__link_active"
          }`}
          to="/profile"
        >
          Аккаунт
        </NavLink>
      </nav>
      <div
        onClick={toggleUnlogState}
        className={`nav__unlog ${
          isLoginOpen ? "nav__unlog_opened" : ""
        }`}
      >
        {!isLoginOpen ? <span className="nav__unlog-line"></span> : <></>}
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
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

  return location.pathname === "/" ||
    location.pathname === "/profile" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ? (
    <header
      className={`header ${location.pathname !== "/" ? "" : "header_main"}`}
    >
      <div className='header__box'>
      <NavLink to="/" className="header__logo-content">
        <img className="header__logo" src={logo} alt="Логотип" />
      </NavLink>
      <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  ) : null;
};

export default Header;
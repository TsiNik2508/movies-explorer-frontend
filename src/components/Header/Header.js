import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/Logo.svg";
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

  return (
    <header
      className={`header ${location.pathname !== "/" ? "" : "header_main"}`}
    >
      <NavLink to="/" className="header__logo-content">
        <img className="header__logo" src={logo} alt="Логотип" />
      </NavLink>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
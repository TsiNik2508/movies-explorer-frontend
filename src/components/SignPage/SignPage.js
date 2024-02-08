import { Link } from "react-router-dom";

import logo from "../../images/Logo.svg";
import "./SignPage.css";

const SignPage = ({
  titleText,
  buttonText,
  logText,
  path,
  signLink,
  inputVal,
  children,
  isLockedButton,
  onSubmit,
}) => {
  return (
    <section className="sign-page">
      <div className="sign-page__title">
        <Link to="/" className="sign-page__logo-link">
          <img className="sign-page__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="sign-page__subtitle">{titleText}</h2>
      </div>
      <form onSubmit={onSubmit} className="sign-page__form">
        {children}
        <button disabled={inputVal || (isLockedButton && 'disabled')} className="sign-page__button" type="submit">
          {buttonText}
        </button>
      </form>
      <p className="sign-page__logged">
        {logText}
        <Link className="sign-page__sign-link" to={path}>
          {signLink}
        </Link>
      </p>
    </section>
  );
};

export default SignPage;
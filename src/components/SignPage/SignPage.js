import { Link } from "react-router-dom";

import logo from "../../images/Logo.svg";
import "./SignPage.css";

const SignPage = ({
  titleText,
  formSign,
  buttonText,
  logText,
  path,
  signLink,
  inputVal,
}) => {
  return (
    <section className="sign-page">
      <div className="sign-page__title">
        <Link to="/" className="sign-page__logo-link">
          <img className="sign-page__logo" src={logo} alt="Логотип" />
        </Link>
        <h2 className="sign-page__subtitle">{titleText}</h2>
      </div>
      <form className="sign-page__form">
        {formSign}
        <button disabled={inputVal} className="sign-page__button" type="submit">
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
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
      <div className="sign-page__container">
        <Link to="/" className="sign-page__logo_link">
          <img className="sign-page__logo" src={logo} alt="Логотп" />
        </Link>
        <h2 className="sign-page__title">{titleText}</h2>
      </div>
      <form className="sign-page__form">
        {formSign}
      </form>
      <button disabled={inputVal} className="sign-page__button" type="submit">
          {buttonText}
        </button>
      <p className="sign-page__log">
        {logText}
        <Link className="sign-page__sign-link" to={path}>
          {signLink}
        </Link>
      </p>
    </section>
  );
};

export default SignPage;
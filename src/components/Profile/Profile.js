import { useState } from "react";
import useInput from "../Utils/validation";
import "./Profile.css";

const Profile = ({ onSignout }) => {
  const [isLocked, setIsLocked] = useState(true);

  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });

  function handleChangeProfile() {
    setIsLocked(!isLocked);
  }

  return (
    <section className="profile">
      <form className="profile-form">
        <h2 className="profile-form__title">Привет, Виталий!</h2>
        <label className="profile-form__label">
          <span className="profile-form__input-name">Имя</span>
          <input
            className="profile-form__input"
            name="name"
            type="text"
            placeholder="Виталий"
            value={userName.value}
            disabled={isLocked && "disabled"}
            onChange={(e) => userName.onChange(e)}
            onBlur={(e) => userName.onBlur(e)}
            required
          ></input>
          <span
            className={`profile-form__error ${
              userName.isDirty &&
              (userName.isEmpty ||
                userName.maxLengthError ||
                userName.minLengthError)
                ? "profile-form__error_visible"
                : ""
            }`}
          >
            Что-то пошло не так...
          </span>
        </label>
        <label className="profile-form__label">
          <span className="profile-form__input-name">E-mail</span>
          <input
            className="profile-form__input"
            name="email"
            type="email"
            placeholder="pochta@yandex.ru"
            value={email.value}
            disabled={isLocked && "disabled"}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            required
          ></input>
          <span
            className={`profile-form__error ${
              email.isDirty && (email.isEmpty || email.isEmail)
                ? "profile-form__error_visible"
                : ""
            }`}
          >
            Что-то пошло не так...
          </span>
        </label>
        <p className="profile-form__error-message">
          При обновлении профиля произошла ошибка.
        </p>
        <button
          className={`profile-form__button ${
            !isLocked ? "profile-form__button_visible" : ""
          }`}
          disabled={(!email.isInputValid || !userName.isInputValid) && "disabled"}
        >
          Сохранить
        </button>
      </form>
      <div
        className={`profile__buttons ${
          isLocked ? "" : "profile__buttons_hidden"
        }`}
      >
        <button onClick={handleChangeProfile} className="profile__button">
          Редактировать
        </button>
        <button
          onClick={onSignout}
          className="profile__button profile__button_logout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
};

export default Profile;

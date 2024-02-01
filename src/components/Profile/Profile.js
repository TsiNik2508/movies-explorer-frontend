import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import useInput from "../utils/validation/validation";

import "./Profile.css";

const Profile = ({ onSignout, onUpdate }) => {
  const currentUser = useContext(CurrentUserContext);

  const userName = useInput(currentUser.name, {
    minLength: 2,
    maxLength: 30,
    isEmpty: true,
  });
  const email = useInput(currentUser.email, { isEmpty: true, isEmail: true });

  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [isValid, setIsValid] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    if (
      (currentUser.email !== email.value && email.isInputValid) ||
      (currentUser.name !== userName.value && userName.isInputValid)
    ) {
      setIsValid(true);
    } else setIsValid(false);
  }, [email, userName, currentUser]);

  useEffect(() => {
    setFormValue({ name: currentUser.name, email: currentUser.email });
  }, [currentUser, isLocked]);

  function handleChangeProfile() {
    setIsLocked(!isLocked);
  }

  function onUpdateProfile(formValue) {
    onUpdate(formValue);
    setIsLocked(!isLocked);
  }

  function handleSubmitUpdateProfile(e) {
    e.preventDefault();
    onUpdateProfile(formValue);
  }

  function handleChangeName(e) {
    setFormValue({ ...formValue, name: e.target.value });
    userName.onChange(e);
  }

  function handleChangeEmail(e) {
    setFormValue({ ...formValue, email: e.target.value });
    email.onChange(e);
  }

  return (
    <section className="profile">
      <form onSubmit={handleSubmitUpdateProfile} className="profile-form">
        <h2 className="profile-form__title">{`Привет, ${
          currentUser.name
        }!`}</h2>
        <label className="profile-form__label">
          <span className="profile-form__input-name">Имя</span>
          <input
            className="profile-form__input"
            name="name"
            type="text"
            placeholder="Имя"
            value={formValue.name}
            disabled={isLocked && "disabled"}
            onChange={handleChangeName}
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
            Имя должно содержать не меньше 2 символов.
          </span>
        </label>
        <label className="profile-form__label">
          <span className="profile-form__input-name">E-mail</span>
          <input
            className="profile-form__input"
            name="email"
            type="email"
            placeholder="E-mail"
            value={formValue.email}
            disabled={isLocked && "disabled"}
            onChange={handleChangeEmail}
            required
          ></input>
          <span
            className={`profile-form__error ${
              email.isDirty && (email.isEmpty || email.isEmail)
                ? "profile-form__error_visible"
                : ""
            }`}
          >
            Неверный формат E-mail.
          </span>
        </label>
        <p className="profile-form__error-message">
          При обновлении профиля произошла ошибка.
        </p>
        <button
          className={`profile-form__button ${
            !isLocked ? "profile-form__button_visible" : ""
          }`}
          disabled={!isValid && "disabled"}
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

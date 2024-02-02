import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import useInput from "../utils/validation/validation";
import MainApi from "../utils/api/MainApi"; 

import "./Profile.css";

const Profile = ({ onSignout }) => {
  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(CurrentUserContext)[1];

  // Состояния для имени, почти, их валидации
  const userName = useInput(currentUser.name, {
    minLength: 2,
    maxLength: 30,
    isEmpty: true,
  });
  const email = useInput(currentUser.email, { isEmpty: true, isEmail: true });

  // Состояни для формы и блокировки редактирования
  const [formValue, setFormValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [isValid, setIsValid] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const apiMain = new MainApi();

  useEffect(() => {
    // Обновление формы при изменении данных текущего пользователя
    setFormValue({ name: currentUser.name, email: currentUser.email });
  }, [currentUser, isLocked]);

  // Обработчик изменения профиля
  function handleChangeProfile() {
    setIsLocked(!isLocked); // Переключени редактирования
  }

  // Обновление профиля
  function onUpdateProfile() {
    apiMain
      .updateUser(formValue)
      .then((res) => {
        setIsLocked(!isLocked);
        // Обновление данных текущего пользователя
        setCurrentUser({ ...currentUser, name: formValue.name, email: formValue.email });
      })
      .catch(() => {
        setIsLocked(true); // Заблокировать форму при ошибке
      });
  }

  // Обработчик отправки формы обновления
  function handleSubmitUpdateProfile(e) {
    e.preventDefault();
    onUpdateProfile();
  }

  function handleChangeName(e) {
    setFormValue({ ...formValue, name: e.target.value });
    userName.onChange(e);
    setIsValid(email.isInputValid && !email.isEmpty && userName.isInputValid && !userName.isEmpty);
  }
  
  function handleChangeEmail(e) {
    setFormValue({ ...formValue, email: e.target.value });
    email.onChange(e);
    setIsValid(email.isInputValid && !email.isEmpty && userName.isInputValid && !userName.isEmpty);
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
      <div className={`profile__buttons ${isLocked ? "" : "profile__buttons_hidden"}`}>
        <button onClick={handleChangeProfile} className="profile__button">
          Редактировать
        </button>
        <button onClick={onSignout} className="profile__button profile__button_logout">
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
};

export default Profile;
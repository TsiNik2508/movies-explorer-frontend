import React from "react";
import SignForm from "../SignForm/SignForm";
import SignPage from "../SignPage/SignPage";
import validation from "../Utils/validation";

const Register = () => {
  const userName = validation("", {
    isEmpty: true,
    minLength: 2,
    maxLength: 30,
  });
  const email = validation("", { isEmpty: true, isEmail: true });
  const password = validation("", { isEmpty: true });

  return (
    <SignPage
      titleText="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      logText="Уже зарегистрированы?"
      path="/signin"
      signLink="Войти"
      inputVal={
        !email.isInputValid || !password.isInputValid || !userName.isInputValid}
      formSign={
        <>
          <SignForm
            inputName="Имя"
            type="text"
            placeholder="Имя"
            value={userName.value}
            isVisible={
              userName.isDirty &&
              (userName.isEmpty ||
                userName.maxLengthError ||
                userName.minLengthError)
            }
            onChange={(e) => userName.onChange(e)}
            onBlur={(e) => userName.onBlur(e)}
          />
          <SignForm
            inputName="E-mail"
            type="email"
            placeholder="E-mail"
            value={email.value}
            isVisible={email.isDirty && (email.isEmpty || email.isEmail)}
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
          />
          <SignForm
            inputName="Пароль"
            type="password"
            value={password.value}
            placeholder="password"
            isVisible={password.isDirty && password.isEmpty}
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
          />
        </>
      }
    />
  );
};

export default Register;

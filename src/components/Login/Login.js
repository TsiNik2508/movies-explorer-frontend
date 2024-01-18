import React from "react";
import SignForm from "../SignForm/SignForm";
import SignPage from "../SignPage/SignPage";
import useInput from "../Utils/validation";

const Login = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  return (
    <SignPage
      titleText="Рады видеть!"
      formSign={
        <>
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
      buttonText="Войти"
      logText="Ещё не зарегистрированы?"
      path="/signup"
      signLink="Регистрация"
      inputVal={!email.isInputValid || !password.isInputValid}
    />
  );
};

export default Login;

import AuthInput from "../AuthInput/AuthInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation/validation";

const Login = ({ onSignin, isLockedButton }) => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const formLoginValues = {
    email: email.value,
    password: password.value,
  };

  const handleSubmitSignin = (e) => {
    e.preventDefault();
    onSignin(formLoginValues);
  };

  return (
    <SignPage
      titleText="Рады видеть!"
      buttonText="Войти"
      logText="Ещё не зарегистрированы?"
      path="/signup"
      signLink="Регистрация"
      inputVal={!email.isInputValid || !password.isInputValid}
      isLockedButton={isLockedButton}
      onSubmit={handleSubmitSignin}
    >
      <AuthInput
        inputName="E-mail"
        type="email"
        placeholder="Ваш E-mail"
        value={email.value}
        isVisible={email.isDirty && (email.isEmpty || email.isEmail)}
        onChange={(e) => email.onChange(e)}
      />
      <AuthInput
        inputName="Пароль"
        type="password"
        value={password.value}
        placeholder="password"
        isVisible={password.isDirty && password.isEmpty}
        onChange={(e) => password.onChange(e)}
      />
    </SignPage>
  );
};

export default Login;

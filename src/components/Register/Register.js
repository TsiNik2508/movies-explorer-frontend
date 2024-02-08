import AuthInput from "../AuthInput/AuthInput";
import SignPage from "../SignPage/SignPage";
import useInput from "../../utils/validation/validation";

const Register = ({ onSignup, isLockedButton }) => {
  const userName = useInput("", { isEmpty: true, minLength: 2, maxLength: 30 });
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 8 });

  const formRegistValues = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    onSignup(formRegistValues);
  };

  return (
    <SignPage
      titleText="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      logText="Уже зарегистрированы?"
      path="/signin"
      signLink="Войти"
      inputVal={
        !email.isInputValid || !password.isInputValid || !userName.isInputValid
      }
      isLockedButton={isLockedButton}
      onSubmit={handleSubmitSignup}
      onSignup={onSignup}
    >
      <AuthInput
        inputName="Имя"
        type="text"
        placeholder="Ваше Имя"
        value={userName.value}
        isVisible={
          userName.isDirty &&
          (userName.isEmpty ||
            userName.maxLengthError ||
            userName.minLengthError)
        }
        onChange={(e) => userName.onChange(e)}
      />
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
        isVisible={
          password.isDirty && (password.isEmpty || password.minLengthError)
        }
        onChange={(e) => password.onChange(e)}
      />
    </SignPage>
  );
};

export default Register;

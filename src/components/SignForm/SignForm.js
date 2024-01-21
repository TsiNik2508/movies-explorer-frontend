import "./SignForm.css";

const SignForm = ({
  inputName,
  placeholder,
  type,
  value,
  onBlur,
  onChange,
  isVisible,
}) => {
  return (
    <label className="sign-form">
      <span className="sign-form__name">{inputName}</span>
      <input
        className="sign-form__field"
        value={value}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      ></input>
      <span
        className={`sign-form__error ${
          isVisible ? "sign-form__error_visible" : ""
        }`}
      >
        Что-то пошло не так...
      </span>
    </label>
  );
};

export default SignForm;
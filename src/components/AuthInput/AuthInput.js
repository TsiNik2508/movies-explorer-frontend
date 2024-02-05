import "./AuthInput.css";

const AuthInput = ({
  onChange,
  value,
  inputName,
  placeholder,
  type,
  isVisible,
}) => {
  return (
    <label className="AuthInput">
      <span className="AuthInput__name">{inputName}</span>
      <input
        className="AuthInput__field"
        value={value}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      <span
        className={`AuthInput__error ${
          isVisible ? "AuthInput__error_visible" : ""
        }`}
      >
        Некорректный формат данных...
      </span>
    </label>
  );
};

export default AuthInput;
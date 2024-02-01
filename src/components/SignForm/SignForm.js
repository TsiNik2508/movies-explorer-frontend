import "./SignForm.css";

const SignForm = ({
  onChange,
  value,
  inputName,
  placeholder,
  type,
  isVisible,
}) => {
  return (
    <label className="SignForm">
      <span className="SignForm__name">{inputName}</span>
      <input
        className="SignForm__field"
        value={value}
        type={type}
        name={type}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      <span
        className={`SignForm__error ${
          isVisible ? "SignForm__error_visible" : ""
        }`}
      >
        Некорректный формат данных...
      </span>
    </label>
  );
};

export default SignForm;
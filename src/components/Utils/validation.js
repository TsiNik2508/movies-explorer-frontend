import { useEffect, useState } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);

          break;
        case "isEmail":
          const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          re.test(String(value).toLowerCase())
            ? setIsEmail(false)
            : setIsEmail(true);
          break;
        default:
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if(isEmpty || isEmail || maxLengthError || minLengthError) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  }, [isEmpty, isEmail, maxLengthError, minLengthError]);

  return {
    minLengthError,
    isEmpty,
    maxLengthError,
    isEmail,
    isInputValid
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

export default useInput;
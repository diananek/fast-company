export function validator(data, config) {
  const errors = {};
  const validate = (validateMethod, value, config) => {
    let validateStatus;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof value === "boolean") {
          validateStatus = value;
        } else {
          validateStatus = !(value.trim() === "");
        }
        break;
      }

      case "isEmail": {
        const regExp = /^\S+@\S+\.\S+$/g;
        validateStatus = regExp.test(value);

        break;
      }
      case "isCapitalSymbol": {
        const regExp = /[A-Z]+/g;
        validateStatus = regExp.test(value);
        break;
      }
      case "isContainDigit": {
        const regExp = /\d+/g;
        validateStatus = regExp.test(value);
        break;
      }
      case "isMin": {
        validateStatus = value.length >= config.min;
        break;
      }
      default:
        break;
    }
    if (!validateStatus) return config.message;
  };
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) errors[fieldName] = error;
    }
  }
  return errors;
}

import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Введите корректную электронную почту"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      isMin: {
        message: "Пароль должен содержать минимум 8 символов",
        min: 8
      }
    },
    profession: {
      isRequired: {
        message: "Профессия обязательна для выбора"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензии"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        value={data.password}
        name="password"
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выбери свою профессию"
        defaultOption="Choose..."
        onChange={handleChange}
        options={professions}
        error={errors.profession}
        value={data.profession}
        name="profession"
      />
      <RadioField
        options={[
          { name: "Мужчина", value: "male" },
          { name: "Женщина", value: "female" },
          { name: "Другое", value: "other" }
        ]}
        label="Выберите пол"
        onChange={handleChange}
        name="sex"
        value={data.sex}
      />
      <MultiSelectField
        name="qualities"
        options={qualities}
        onChange={handleChange}
        label="Выберите качества"
        defaultOptions={data.qualities}
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подвердить использование <a>лицензии</a>{" "}
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;

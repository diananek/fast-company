import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const EditForm = ({ userId }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    sex: "",
    profession: "",
    qualities: []
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState({});
  const [isLoading, setIsLoading] = useState();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ qualities, profession, ...data }) => {
      const resultData = {
        ...data,
        profession: profession._id, 
        qualities: transformData(qualities)
      };
      setData(resultData);
    });
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Введите корректную электронную почту"
      }
    },
    profession: {
      isRequired: {
        message: "Профессия обязательна для выбора"
      }
    }
  };

  useEffect(() => {
    validate();
    if (data._id) setIsLoading(false);
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const transformData = (data) =>
    data.map((item) => ({
      label: item.name,
      value: item._id
    }));

  const getProfessionById = (id) => {
    const findProfName = Object.keys(professions).find(
      (professionName) => professions[professionName]._id === id
    );
    return professions[findProfName];
  };
  const getQualities = (elements) => {
    return elements.map(
      (quality) =>
        qualities[
          Object.keys(qualities).find(
            (qualityName) => qualities[qualityName]._id === quality.value
          )
        ]
    );
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const submitData = {
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities)
    };
    console.log(submitData);
    api.users
      .update(userId, submitData)
      .then((data) => history.push(`/users/${data._id}`));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
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
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Обновить
          </button>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

EditForm.propTypes = {
  userId: PropTypes.string.isRequired
};

export default EditForm;

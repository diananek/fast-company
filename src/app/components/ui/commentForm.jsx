import React, { useState, useEffect } from "react";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validator";
import api from "../../api";
import TextArea from "../common/form/textArea";
const CommentForm = ({ onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState({
    name: "",
    comment: ""
  });
  useEffect(() => {
    setIsLoading(true);
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);
  useEffect(() => {
    if (users.length !== 0) setIsLoading(false);
  }, [users]);
  useEffect(() => {
    validate();
  }, [data]);
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для выбора"
      }
    },
    comment: {
      isRequired: {
        message: "Необходимо написать комментарий"
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const submitData = {
      userId: users.find((user) => user.name === data.name)._id,
      content: data.comment
    };
    setData({
      name: "",
      comment: ""
    });
    onSubmit(submitData);
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <SelectField
            defaultOption="Выбери пользователя..."
            onChange={handleChange}
            options={users}
            error={errors.name}
            value={data.name}
            name="name"
          />
          <TextArea
            label="Comment"
            name="comment"
            error={errors.comment}
            value={data.comment}
            onChange={handleChange}
          />
          <button
            className="btn btn-primary mt-3"
            type="submit"
            disabled={!isValid}
          >
            Опубликовать
          </button>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default CommentForm;

import React from "react";

const TextArea = ({
  label,
  placeholder,
  name,
  error,
  value,
  onChange,
  rows = "3"
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <>
      <label htmlFor="floatingTextarea">{label}</label>
      <textarea
        className="form-control"
        placeholder={placeholder}
        id={name}
        rows={rows}
        value={value}
        onChange={handleChange}
        name={name}
      ></textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

export default TextArea;

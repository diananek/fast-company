import React from "react";
import PropTypes from "prop-types";
const SelectField = ({
  label,
  value,
  defaultOption,
  onChange,
  options,
  error,
  name
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;
  const renderSelectClasses = () =>
    "form-select " + (error ? "is-invalid" : "is-valid");
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <select
        className={renderSelectClasses()}
        id={name}
        required
        value={value}
        onChange={handleChange}
        name={name}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              value={option.value}
              key={option.value + String(Math.random())}
            >
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default SelectField;

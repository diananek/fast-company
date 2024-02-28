import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({
  name,
  options,
  onChange,
  label,
  defaultOptions
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;
  const handleChange = (value) => {
    onChange({ name, value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        name={name}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        value={defaultOptions}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
  defaultOptions: PropTypes.array
};

export default MultiSelectField;

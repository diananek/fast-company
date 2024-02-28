import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, onChange, error, value, children }) => {
  const handleChange = () => [onChange({ name, value: !value })];
  const renderCheckBoxClasses = () =>
    "form-check-input " + (error ? "is-invalid" : "");
  return (
    <div className="form-check mb-4">
      <input
        className={renderCheckBoxClasses()}
        type="checkbox"
        value={name}
        id={name}
        checked={value}
        onChange={handleChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
CheckBoxField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default CheckBoxField;

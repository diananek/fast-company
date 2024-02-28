import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const renderInputClasses = () =>
    "form-control " + (error ? "is-invalid" : "is-valid");
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={name}
          onChange={handleChange}
          value={value}
          className={renderInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
          >
            <i
              className={"bi bi-eye" + (showPassword ? "-slash-fill" : "-fill")}
            ></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text"
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;

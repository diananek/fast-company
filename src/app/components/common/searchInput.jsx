import React from "react";
import PropTypes from "prop-types";

const SearchInput = (props) => {
  return (
    <input
      placeholder="Search..."
      type="text"
      className="form-control"
      {...props}
    ></input>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func
};

export default SearchInput;

import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ usersLength }) => {
  const renderPhrase = (number) => {
    const lastOne = number % 10;
    if (number > 4 && number < 15) return `${number} человек тусанет`;
    if ([2, 3, 4].indexOf(lastOne) >= 0) return `${number} человека тусанут`;
    return `${number} человек тусанет`;
  };

  const isEmpty = usersLength === 0;
  return (
    <h2>
      <span className={`badge bg-${isEmpty ? "danger" : "primary"} fs-3`}>
        {isEmpty
          ? "Никто с тобой не тусанет"
          : `${renderPhrase(usersLength)} с тобой сегодня`}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  usersLength: PropTypes.number.isRequired
};

export default SearchStatus;

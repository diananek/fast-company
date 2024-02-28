import React from "react";
import EditForm from "../../ui/editForm";
import PropTypes from "prop-types";
import BackButton from "../../common/backButton";

const UserEditPage = ({ userId }) => {
  return (
    <div className="container mt-5">
      <BackButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <EditForm userId={userId} />
        </div>
      </div>
    </div>
  );
};

UserEditPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserEditPage;

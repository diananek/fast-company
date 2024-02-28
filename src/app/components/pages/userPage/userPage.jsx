import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import PropTypes from "prop-types";
import InfoCard from "../../ui/info-card";
import CommentsList from "../../ui/comments";

const UserPage = ({ userId }) => {
  const history = useHistory();

  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClick = () => {
    history.push(`/users/${userId}/edit`);
  };
  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <InfoCard userInfo={user} onClick={handleClick} />
          </div>
          <div className="col-md-8">
            <CommentsList />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;

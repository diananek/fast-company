import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import QualitiesList from "./qualities/qualitiesList";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  onDelete,
  onSort,
  selectedSort,
  onToggleBookMark
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    quality: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: () => (
        <button type="button" className="btn btn-danger">
          delete
        </button>
      )
    }
  };
  return (
    <Table {...{ selectedSort, onSort, onDelete, columns, data: users }} />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;

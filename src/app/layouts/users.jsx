import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/pages/userPage";
import UsersListPage from "../components/pages/usersListPage";
import UserEditPage from "../components/pages/userEditPage/userEditPage";
const Users = () => {
  const params = useParams();
  const { userId, type } = params;
  if (type === "edit") {
    return <UserEditPage userId={userId} />;
  }
  return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;

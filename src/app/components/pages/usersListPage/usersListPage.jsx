import React, { useEffect, useState } from "react";
import Pagination from "../../common/pagination";
import { pagination } from "../../../utils/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import api from "../../../api";
import UserTable from "../../ui/userTable";
import SearchInput from "../../common/searchInput";

const UsersListPage = () => {
  const [users, setUsers] = useState();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (event) => {
    if (
      event.target.type === "button" &&
      event.target.textContent === "delete"
    ) {
      const id = event.target.closest("tr").getAttribute("data-user-id");
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  const handleChangeSearch = ({ target }) => {
    setSearchValue(target.value);
    setSelectedProf();
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  const pageSize = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const [sortedBy, setSortedBy] = useState({ path: "name", order: "asc" });

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchValue]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSearchValue("");
    setSelectedProf(item);
  };
  const clearFilter = () => {
    setSelectedProf();
  };

  const handleUserSort = (item) => {
    setSortedBy(item);
  };

  if (users) {
    const filteredUsers = searchValue
      ? users.filter(({ name }) =>
          name.toLowerCase().includes(searchValue.trim().toLowerCase())
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const sortedUsers = _.orderBy(
      filteredUsers,
      [sortedBy.path],
      [sortedBy.order]
    );

    const usersCrop = pagination(sortedUsers, currentPage, pageSize);
    const count = filteredUsers.length;
    const isEmpty = count === 0;
    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary m-3" onClick={clearFilter}>
              clear
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus usersLength={count} />
          <SearchInput onChange={handleChangeSearch} value={searchValue} />
          {!isEmpty && (
            <UserTable
              users={usersCrop}
              onDelete={handleDelete}
              onSort={handleUserSort}
              selectedSort={sortedBy}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};
export default UsersListPage;

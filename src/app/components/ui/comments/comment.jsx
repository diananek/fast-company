import React, { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";
import { displayDate } from "../../../utils/displayDate";
const Comment = ({ id, userId, content, time, onDelete }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClick = () => {
    onDelete(id);
  };
  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);
  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        {!isLoading ? (
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">
                      {user?.name}
                      <span className="small m-4">{displayDate(time)}</span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={handleClick}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "...loading"
        )}
      </div>
    </div>
  );
};

export default Comment;

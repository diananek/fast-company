import React from "react";
import QualitiesList from "../qualities/qualitiesList";
import MeetingsCard from "./meetingsCard";
import QualitiesCard from "./qualitiesCard";
const InfoCard = ({ userInfo, onClick }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={onClick}
          >
            <i className="bi bi-gear"></i>
          </button>
          <div className="d-flex flex-column align-items-center text-center position-relative">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
              )
                .toString(36)
                .substring(7)}.svg`}
              className="rounded-circle"
              width="150"
            />
            <div className="mt-3">
              <h4>{userInfo.name}</h4>
              <p className="text-secondary mb-1">{userInfo.profession?.name}</p>
              <div className="text-muted">
                <i
                  className="bi bi-caret-down-fill text-primary"
                  role="button"
                ></i>
                <i className="bi bi-caret-up text-secondary" role="button"></i>
                <span className="ms-2">{userInfo.rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <QualitiesCard qualities={userInfo.qualities} />
      </div>
      <div className="card mb-3">
        <MeetingsCard completedMeetings={userInfo.completedMeetings} />
        {/* <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Completed meetings</span>
          </h5>
          <h1 className="display-1">{userInfo.completedMeetings}</h1>
        </div> */}
      </div>
    </>
  );
};

export default InfoCard;

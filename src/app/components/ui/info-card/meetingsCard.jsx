import React from "react";
const MeetingsCard = ({ completedMeetings }) => {
  return (
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Completed meetings</span>
      </h5>
      <h1 className="display-1">{completedMeetings}</h1>
    </div>
  );
};

export default MeetingsCard;

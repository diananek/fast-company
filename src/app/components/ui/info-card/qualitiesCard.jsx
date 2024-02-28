import React from "react";
import QualitiesList from "../qualities/qualitiesList";
const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <p className="card-text">
        <QualitiesList qualities={qualities} />
      </p>
    </div>
  );
};

export default QualitiesCard;

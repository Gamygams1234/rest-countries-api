import React from "react";
import { Link } from "react-router-dom";

export default function HomeItem(props) {
  const { name, population, capital, region, flag, official,  } = props;

  return (
    <Link  to={"/countries/"+ official} className="country-card">
      <div className="flag-image" style={{ backgroundImage: `url(${flag})` }}></div>
      <div className="description">
        <div className="title fw-800">{name}</div>
        <div className="description-item">
          <span className="fw-600">Population: </span>
          {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
        <div className="description-item">
          <span className="fw-600">Region: </span>
          {region}
        </div>
        <div className="description-item">
          <span className="fw-600">Capital: </span>
          {capital}
        </div>
      </div>
    </Link>
  );
}

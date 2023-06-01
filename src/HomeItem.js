import React from "react";

export default function HomeItem(props) {
  const { name, population, capital, region, flag } = props;

  return (
    <div className="country-card">

    
    <div className="flag-image" style={{backgroundImage: `url(${flag})` }}>

    </div>
    <div className="description">
    <div className= "title fw-800">{name}</div>
    <div className="description-item">
        <span className="fw-600">Population: </span>{population}
    </div>
    <div className="description-item">
        <span className="fw-600">Region: </span>{region}
    </div>
    <div className="description-item">
        <span className="fw-600">Capital: </span>{capital}
    </div>

    </div>
  


    </div>
  );
}

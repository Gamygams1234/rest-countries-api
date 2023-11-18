import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import BorderButton from "./BorderButton";

export default function CountryInfo() {
  const params = useParams();
  const context = useContext(ThemeContext);
  const classes = clsx(
    {
      dark: context.theme === "dark",
    },
    "info",
    "outside-container"
  );

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [population, setPopulation] = useState("");
  const [nativeName, setNativeName] = useState("none");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [capital, setCapital] = useState("");
  const [topLevelDomain, setTopLevelDomain] = useState("");
  const [currencies, setCurrencies] = useState("N/A");
  const [languages, setLanguages] = useState("");
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
   
    fetch("https://restcountries.com/v3.1/alpha/" + params.country)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setName(data[0].name.common);
          setImage(data[0].flags.svg);
          setPopulation(data[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          setNativeName(data[0].name.nativeName?.srp?.common ? data[0].name.nativeName.srp.common : data[0].name.official);
          setRegion(data[0].region ? data[0].region : "N/A");
          setSubRegion(data[0].subregion ? data[0].region : "N/A");
          setCapital(data[0].capital ? data[0].capital : "N/A");
          setTopLevelDomain(data[0].tld[0]);
          let currency = Object.keys(data[0].currencies)[0];
          setCurrencies(data[0].hasOwnProperty("currencies") ? data[0].currencies[currency].name : "N/A");
          let tempLanguages = data[0].languages ? Object.values(data[0].languages) : [];
          setLanguages(tempLanguages);
         
          if (data[0].borders){
         
            setBorders(data[0].borders)
            console.log(data[0].borders)
     
      
          }else{
            setBorders([])
          }
         

         
     
        }
      })


      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.country]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={classes}>
        <div className="inner-container">
          <div className="back-button">
            <Link to="/" className="btn">
              <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
            </Link>
          </div>

          <div className="country-info">
            <div className="flag">
              <img src={image} alt="" />
            </div>
            <div className="description">
              <h2 className="fw-800">{name}</h2>

              <div className="details">
                <div className="detail-group first-detail">
                  {nativeName !== "none" && (
                    <div className="detail">
                      <span className="fw-600">Native Name:</span>
                      {nativeName}
                    </div>
                  )}
                  <div className="detail">
                    <span className="fw-600">Population:</span>
                    {population}
                  </div>
                  <div className="detail">
                    <span className="fw-600">Region:</span>
                    {region}
                  </div>
                  {subRegion !== "N/A" && (
                    <div className="detail">
                      <span className="fw-600">Sub Region:</span>
                      {subRegion}
                    </div>
                  )}
                  {capital !== "N/A" && (
                    <div className="detail">
                      <span className="fw-600">Capital:</span>
                      {capital}
                    </div>
                  )}
                </div>
                <div className="detail-group second-detail">
                  <div className="detail">
                    <span className="fw-600">Top Level Domain:</span>
                    {topLevelDomain}
                  </div>
                  {currencies !== "N/A" && (
                    <div className="detail">
                      <span className="fw-600">Currencies:</span>
                      {currencies}
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div className="detail">
                      <span className="fw-600">Languages:</span>
                      {languages.join(", ")}
                    </div>
                  )}
                </div>

                {borders.length > 0 && (
                  <div className="border-countries">
                    <h3 className="fw-600">Border Countries:</h3>
                    <div className="countries">
                      {borders.map((item, index) => {
                        return <BorderButton key={index} name={item} />;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

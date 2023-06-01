import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import Loader from "./Loader";

import { ThemeContext } from "./ThemeContext";
import HomeItem from "./HomeItem";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  const context = useContext(ThemeContext);

  const classes = clsx(
    {
      dark: context.theme === "dark",
    },
    "home",
    "outside-container"
  );

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setCountries(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes}>
      <div className="inner-container">
        {loading && <Loader />}
        {!loading && <div>This is the home</div>}

        <div className="list">
          {countries.length > 0 &&
            countries.map((country, index) => {
              {
                /* return <div className = "country" key={index}>{country.name.common}</div> */
              }
              return <HomeItem name={country.name.common} population={country.population} region={country.region} capital={country.capital} flag={country.flags.svg} />;
            })}
        </div>
      </div>
    </div>
  );
}

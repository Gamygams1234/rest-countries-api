import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import Loader from "./Loader";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { ThemeContext } from "./ThemeContext";
import HomeItem from "./HomeItem";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("")

  const context = useContext(ThemeContext);

  const classes = clsx(
    {
      dark: context.theme === "dark",
    },
    "home",
    "outside-container"
  );

  useEffect(() => {
      let url = "";
      setLoading(true);

    if (filter.toLowerCase() === "all"){
       url ="https://restcountries.com/v3.1/all";
    }else{
        url = `https://restcountries.com/v3.1/region/${filter}`
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

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
  }, [filter]);


const handleFilterChange=(e)=>{
  setFilter(e.target.value)
}

  return (
    <div className={classes}>
      <div className="inner-container">
        {loading && <Loader />}
        {!loading && <>

        <div className="form">
            <form onSubmit={e=>e.preventDefault()}>
                <input type="text" className="fw-300" name= "search"  value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search for a country..."/>
                <select name="filter" className = "select" value={filter} onChange={e=>handleFilterChange(e)} >
        

                <option>All</option>
                <option>Africa</option>
                <option>America</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>
            </select>
  
            </form>
        </div>

{ countries.filter(country=> country.name.common.toLowerCase().includes(search.toLowerCase())).map((country, index) => {
              return <HomeItem key={index} official = {country.name.official} name={country.name.common} population={country.population} region={country.region} code={country.ccn3}  capital={country.capital} flag={country.flags.svg} />;
            }).length > 0 ?
        <div className="list">
 
         
              
        {countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())).map((country, index) => {
              return <HomeItem key={index} official = {country.name.official} name={country.name.common} population={country.population} region={country.region} code={country.ccn3} capital={country.capital} flag={country.flags.svg} />;
            })}
         
            
        </div>:
        
        <div className="sorry">
              <h1 className="fw-800">Sorry, there are no countries that match this query.</h1>
              <h2 className="fw-800">Please search again.</h2>
            </div>}
  
       </> }
      </div>
    </div>
        
  );
}

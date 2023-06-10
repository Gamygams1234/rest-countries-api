import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function BorderButton(props) {


    const {name} = props;

    const [country, setCountry] = useState("");

    useEffect(()=>{
      fetch("https://restcountries.com/v3.1/alpha/" +name)
      .then((response) => response.json())
      .then(data=>{
        setCountry(data[0].name.common)
        
      })

    },[name])


  
  return (
    <Link to={"/countries/"+ country} className="btn">{country}</Link>

  )
}


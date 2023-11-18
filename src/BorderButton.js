import { faJpy } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function BorderButton(props) {


    const {name} = props;

    const [country, setCountry] = useState("");
    const [link, setLink]= useState("")

    useEffect(()=>{
      fetch("https://restcountries.com/v3.1/alpha/" +name)
      .then((response) => response.json())
      .then(data=>{
        setCountry(data[0].name.common)
        setLink(data[0].ccn3)
        console.log(data[0])
        
      })

    },[name])


  
  return (
    <Link to={"/countries/"+ link} className="btn">{country}</Link>

  )
}


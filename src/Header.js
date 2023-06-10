import React, {  useContext } from "react";
import clsx from 'clsx';
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function Header(props) {
  const context = useContext(ThemeContext);
  const element = <FontAwesomeIcon icon={faMoon} />;
  const elementRegular = <FontAwesomeIcon icon={faMoonRegular} />;

  const classes = clsx(
    {
      dark: context.theme === "dark",
    },
    "header",
    "outside-container"
  );

  return (
    <div className={classes}>
      <div className="inner-container">
        <Link to = "/" className="logo fw-800">Where in the world?</Link>

        <div className="darkmode-button fw-300" onClick = {context.toggleTheme}>
          {context.theme === "dark" ? element : elementRegular} Dark Mode
        </div>
      </div>
    </div>
  );
}

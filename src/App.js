import React, { useState } from "react";
import "./App.scss";
import Header from "./Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext.js";
import Home from "./Home";



function App() {
  return (
    <ThemeProvider>
     <BrowserRouter>
      <Header />

     
        <Routes>
          <Route path="/" element={<Home />}></Route>

          
          {/* <Route path="/products/:id" element={<Product />}>
                </Route> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

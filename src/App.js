import React, { useState } from "react";
import "./App.scss";
import Header from "./Header";


import { ThemeProvider,} from './ThemeContext.js'

function App() {




  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}

export default App;

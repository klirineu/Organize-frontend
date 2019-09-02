import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import Routes from "./routes";
import Header from "./Header/index";
import { store, persistor } from "./store/index";

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

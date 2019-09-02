import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import Routes from "./routes";
import Header from "./Header/index";
import { store, persistor } from "./store/index";

export default function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

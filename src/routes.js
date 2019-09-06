import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/index";
import Log from "./pages/Log/index";
import List from "./pages/Listdev/index";
import Query from "./pages/Devquery/index";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Log} />
    <PrivateRoute path="/list" component={List} />
    <PrivateRoute path="/query" component={Query} />
  </Switch>
);

export default Routes;

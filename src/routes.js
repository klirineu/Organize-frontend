import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./auth/index";
import Log from "./pages/Log/index";
import List from "./pages/Listdev/index";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Log} />
    <PrivateRoute path="/list" component={List} />
  </Switch>
);

export default Routes;

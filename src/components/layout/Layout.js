import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../../routes";
import Header from "./Header";

import "../../css/App.css";

const Layout = () => {
  return (
    <>
      <Header />
      <br />
      <Switch>
        {routes.map((route, idx) => {
          return route.component ? (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) => <route.component {...props} />}
            />
          ) : null;
        })}
      </Switch>
    </>
  );
};

export default Layout;

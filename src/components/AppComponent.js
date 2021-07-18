import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configStore from "./../redux/store";

const { store, persistor } = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/" name="Home" component={Layout} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

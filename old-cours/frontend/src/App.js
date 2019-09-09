import React, { Fragment, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Alert from "./components/layout/Alert";
import Lending from "./components/layout/Lending";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
// Redux
import { Provider } from "react-redux";
import Register from "./components/auth/Register";
import { loadUser } from "./actions/auth";
import setAuthToken from "./Helpers/setAuthToken";
import store from "./store";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Lending} />
          <Route exact path="/profiles" component={Lending} />
          <section>
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

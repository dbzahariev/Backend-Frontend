import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Lending from "./components/layout/Lending";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Lending} />
      <Route exact path="/profiles" component={Lending} />
      <section>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;

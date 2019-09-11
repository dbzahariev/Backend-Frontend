import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import React from "react";

const App = () => {
  return (
    <ContactState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </ContactState>
  );
};

export default App;

import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
// eslint-disable-next-line
import M from "materialize-css/dist/js/materialize";
import "./App.css";

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return <div className="App">Hello World</div>;
};

export default App;

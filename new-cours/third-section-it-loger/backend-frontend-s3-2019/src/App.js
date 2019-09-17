import React, { useEffect } from "react";
import SearchBar from "./components/layout/SearchBar";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import Logs from "./components/logos/Logs";
import AddBtn from "./components/layout/AddBtn";
import AddLogModal from "./components/logos/AddLogModal";
import EditLogModal from "./components/logos/EditLogModal";
import AddTechModal from "./components/techs/AddTechModal";
import TechListModal from "./components/techs/TechListModal";

const App = () => {
  useEffect(() => {
    // Init materialize-js
    M.AutoInit();
  });
  return (
    <div className="App">
      <SearchBar />
      <div className="container">
        <AddBtn />
        <AddLogModal />
        <EditLogModal />
        <AddTechModal />
        <TechListModal />
        <Logs />
      </div>
    </div>
  );
};

export default App;

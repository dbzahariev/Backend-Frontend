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
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  useEffect(() => {
    // Init materialize-js
    M.AutoInit();
  });
  return (
    <div id="app">
      <Provider store={store}>
        <SearchBar />
        <div className="container">
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModal />
          <Logs />
        </div>
      </Provider>
    </div>
  );
};

export default App;

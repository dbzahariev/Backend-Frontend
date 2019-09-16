import axios from "axios";
import { headerForToken } from "../config/database";

const setAthToken = token => {
  if (token) {
    axios.defaults.headers.common[headerForToken] = token;
  } else {
    delete axios.defaults.headers.common[headerForToken];
  }
};

export default setAthToken;

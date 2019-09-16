import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
  if (!axios.defaults.headers.common["Content-Type"]) {
    axios.defaults.headers.common["Content-Type"] = "application/json";
  }
};

export default setAuthToken;

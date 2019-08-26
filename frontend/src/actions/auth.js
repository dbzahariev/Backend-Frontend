import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR
} from "../config/types";
import { headersConfig } from "../config/database";
import setAuthToken from "../Helpers/setAuthToken";

//Login user
export const loadUser = () => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//Registration User
export const register = formDate => async dispatch => {
  const newUser = {
    name: formDate.username,
    email: formDate.email,
    password: formDate.password
  };
  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post("/api/users", body, headersConfig);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert("Register success", "success", 0));
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    dispatch({ type: REGISTER_FAIL });
    return null;
  }
};

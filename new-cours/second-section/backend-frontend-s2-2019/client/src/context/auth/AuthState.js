/* eslint-disable */

import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from "../types";

import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import React from "react";
import axios from "axios";
import setAuthToken from "../../utils/SetAuthToken";

const config = { headers: { "Content-Type": "application/json" } };

const AuthStates = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") !== null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(localStorage.getItem("token"));

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.errors[0]
      });
    }
  };

  // Register User
  const register = async formData => {
    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors[0]
      });
    }
  };

  // Login User
  const login = async formData => {
    try {
      const res = await axios.post("/api/auth", formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors[0]
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({
      type: LOGOUT,
      payload: null
    });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  // Filtered Auth

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        loadUser,
        register,
        clearErrors,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthStates;

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

const AuthStates = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = () => {
    dispatch({
      type: USER_LOADED
    });
  };

  // Register User

  // Login User

  // Logout

  // Clear errors

  // Filtered Auth

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthStates;

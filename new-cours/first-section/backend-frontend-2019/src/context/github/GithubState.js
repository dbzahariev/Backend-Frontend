import { CLEAR_USERS, GET_USER, SEARCH_USERS, SET_LOADING } from "../types";
import React, { useReducer } from "react";

import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import axios from "axios";

let githubClientId = "";
let githubClientSecret = "";

if (process.env.NODE_ENV === "development") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: null,
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github user
  const searchUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${username}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  // Clear users from site
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Get one user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };
  //TODO:Set Loading

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

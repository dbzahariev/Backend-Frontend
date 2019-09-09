import React from "react";
import PropTypes from "prop-types";

const Search = ({ searchUser, clearUsers, showClear, setAlert }) => {
  const [username, setUsername] = React.useState("");

  const handleChange = e => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  };

  const handleClick = e => {
    e.preventDefault();
    if (username === "") {
      setAlert("Please insert username for search", "light");
    } else {
      searchUser(username);
      setUsername("");
    }
  };

  return (
    <React.Fragment>
      <form className="form">
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Search user"
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
          onClick={handleClick}
        />
      </form>
      {showClear ? (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      ) : null}
    </React.Fragment>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired
};

export default Search;

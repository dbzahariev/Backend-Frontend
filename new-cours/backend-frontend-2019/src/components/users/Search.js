import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";
import React from "react";

const Search = () => {
  const { searchUser, clearUsers, users } = React.useContext(GithubContext);
  const { setAlert } = React.useContext(AlertContext);

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
      {users.length > 0 ? (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      ) : null}
    </React.Fragment>
  );
};

export default Search;

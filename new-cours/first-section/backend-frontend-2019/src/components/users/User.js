import React, { useEffect } from "react";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/github/githubContext";

const User = ({ match }) => {
  const { getUser, user, loading } = React.useContext(GithubContext);
  useEffect(() => {
    getUser(match.params.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;
  if (!user) return <div></div>;

  return (
    <div className="text-center">
      <p>Username: {user.login}</p>
      <p>Avatar:</p>
      <img
        src={user.avatar_url}
        alt="avatar"
        className="round-img"
        style={{ width: "100px", display: "inline-block" }}
      />
      <br />
      <a href={user.html_url} target="blank" className="btn btn-danger">
        Go to Github profile
      </a>
    </div>
  );
};

export default User;

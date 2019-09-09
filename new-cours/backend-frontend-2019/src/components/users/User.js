import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";

const User = ({ getUser, match, user, loading }) => {
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

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default User;

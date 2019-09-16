import React from "react";
import UserItems from "./UserItems";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const { loading, users } = React.useContext(GithubContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={usersStyle}>
      {users.map(user => (
        <UserItems key={user.id} user={user} />
      ))}
    </div>
  );
};

const usersStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default Users;

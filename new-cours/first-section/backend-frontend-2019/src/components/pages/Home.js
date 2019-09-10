import React from "react";
import Search from "../../components/users/Search";
import Users from "../../components/users/Users";

const Home = props => {
  return (
    <React.Fragment>
      <Search />
      <Users />
    </React.Fragment>
  );
};

export default Home;

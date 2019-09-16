import { Link, Redirect } from "react-router-dom";
import React, { Fragment, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login as loginActions } from "../../actions/auth";

const Login = ({ loginActions, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = formData;

    loginActions(email, password);
  };

  //Redirect if Login
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        Email:
        <br />
        <input type="text" name="email" onChange={handleChange} />
        <br />
        Password
        <br />
        <input type="password" name="password" onChange={handleChange} />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/register">Don't have account?</Link>
    </Fragment>
  );
};

Login.propTypes = {
  loginActions: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginActions }
)(Login);

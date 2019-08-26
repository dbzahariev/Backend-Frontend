import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register as registerAction } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, registerAction }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confPassword: ""
  });

  const { username, email, password, confPassword } = formData;

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confPassword) {
      setAlert("Password incorrect", "danger");
    } else {
      let token = await registerAction(formData);
      token && console.log(token);
    }
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        Username:
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="username"
          value={username}
        />
        <br />
        Email:
        <br />
        <input onChange={handleChange} type="text" name="email" value={email} />
        <br />
        Password
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
        />
        <br />
        Repeat password
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="confPassword"
          value={confPassword}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/login">Have account?</Link>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, registerAction }
)(Register);

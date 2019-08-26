import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
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
      setAlert("Password incorrect", "danger", 0);
    } else {
      console.log("SUCCESS");
    }
  };

  return (
    <Fragment>
      <p>Register account</p>
      <form onSubmit={handleSubmit}>
        Username:
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="username"
          value={username}
          required
        />
        <br />
        Email:
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={email}
          required
        />
        <br />
        Password
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
          minLength={6}
          required
        />
        <br />
        Repeat password
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="confPassword"
          value={confPassword}
          minLength={6}
          required
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
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Register);

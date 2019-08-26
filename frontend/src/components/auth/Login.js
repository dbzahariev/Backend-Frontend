import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { headersConfig } from "../../config/database";

const Login = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const newUser = { email, password };
      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/auth", body, headersConfig);
      console.log(res.data);
      setAlert("Login successful");
    } catch (err) {
      setAlert(err.response.data.errors[0].msg, "danger");
    }
  };

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
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert }
)(Login);

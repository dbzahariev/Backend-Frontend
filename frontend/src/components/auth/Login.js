import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
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
      const config = {
        headers: { "Content-Type": "application/json" }
      };

      const newUser = { email, password };
      const body = JSON.stringify(newUser);

      const res = await axios.post("/api/auth", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
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

export default Login;

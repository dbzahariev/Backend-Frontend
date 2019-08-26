import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
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
      console.error("Password incorrect");
    } else {
      const newUser = { name: username, email, password };

      try {
        const config = {
          headers: { "Content-Type": "application/json" }
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data.errors[0].msg);
      }
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

export default Register;

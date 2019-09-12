// import AuthContext from "../../context/auth/authContext";

import React from "react";

const Login = () => {
  // const authContext = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChange = e => {
    setUser({
      email,
      password,
      [e.target.name]: e.target.value
    });
  };

  const setUser = user => {
    const { email, password } = user;
    setEmail(email);
    setPassword(password);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);
  };

  return (
    <div className="form-control">
      <h3>
        Account <span className="text-primary">Login</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        ></input>
      </form>
    </div>
  );
};

export default Login;

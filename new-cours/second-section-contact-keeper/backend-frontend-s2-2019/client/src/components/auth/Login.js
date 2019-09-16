import React from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  const authContext = React.useContext(AuthContext);
  const alertContext = React.useContext(AlertContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onChange = e => {
    setUser({
      email,
      password,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }

    if (authContext.error) {
      alertContext.setAlert(authContext.error.msg, "danger");
      authContext.clearErrors();
    }
  }, [alertContext, authContext, props.history]);

  const setUser = user => {
    const { email, password } = user;
    setEmail(email);
    setPassword(password);
  };

  const handleSubmit = e => {
    e.preventDefault();
    authContext.login({ email, password });
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

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import React from "react";

const Register = props => {
  const authContext = React.useContext(AuthContext);
  const alertContext = React.useContext(AlertContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");

  React.useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }

    if (authContext.error) {
      alertContext.setAlert(authContext.error.msg, "danger");
      authContext.clearErrors();
    }
  }, [alertContext, authContext, props.history]);

  const onChange = e => {
    setUser({
      name,
      email,
      password,
      confPassword,
      [e.target.name]: e.target.value
    });
  };

  const setUser = user => {
    const { name, email, password, confPassword } = user;
    setName(name);
    setEmail(email);
    setPassword(password);
    setConfPassword(confPassword);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = { name, email, password, confPassword };

    authContext.register(user);
  };

  return (
    <div className="form-control">
      <h3>
        Account <span className="text-primary">Register</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
        <div className="form-group">
          <label htmlFor="password">Repeat password</label>
          <input
            type="password"
            name="confPassword"
            value={confPassword}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-block btn-primary"
        ></input>
      </form>
    </div>
  );
};

export default Register;

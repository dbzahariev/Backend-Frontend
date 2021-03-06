import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
  const authContext = React.useContext(AuthContext);
  const contactContext = React.useContext(ContactContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    contactContext.clearContacts();
  };
  const authLinks = (
    <React.Fragment>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </React.Fragment>
  );
  return (
    <nav className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>
        {user ? <li>Hello {user && user.name}</li> : null}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

Navbar.defaultProps = { title: "Contact Keeper", icon: "fas fa-id-card-alt" };

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;

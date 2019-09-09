import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout as logoutAction } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logoutAction }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logoutAction} href="#!">
          Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <h1>
        <Link to="/">Home</Link>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </h1>
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAction }
)(Navbar);

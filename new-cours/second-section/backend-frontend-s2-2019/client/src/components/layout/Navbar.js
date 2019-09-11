import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const Navbar = ({ title, icon }) => {
  return (
    <nav className="navbar bg-primary">
      <Link to="/">
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
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

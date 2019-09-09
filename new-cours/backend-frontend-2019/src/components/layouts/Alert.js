import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <React.Fragment>
        <div className={`alert alert-${alert.type}`}>
          <i className="fas fa-info-circle" /> {alert.text}
        </div>
      </React.Fragment>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object
};

export default Alert;

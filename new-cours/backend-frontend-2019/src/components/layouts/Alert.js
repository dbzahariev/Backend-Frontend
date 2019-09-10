import AlertContext from "../../context/alert/alertContext";
import React from "react";

const Alert = () => {
  const { alert } = React.useContext(AlertContext);
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

export default Alert;

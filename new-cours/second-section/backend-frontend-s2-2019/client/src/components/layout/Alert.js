import AlertContext from "../../context/alert/alertContext";
import React from "react";

const Alert = () => {
  const alertContext = React.useContext(AlertContext);
  return (
    alertContext.alerts &&
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alert;

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const LogItem = ({ log }) => {
  const normalDate = moment(
    `${log.date.split("-")[2]}-${log.date.split("-")[0]}-${
      log.date.split("-")[1]
    }`
  ).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <li key={log.id} className="collection-item">
      <div>
        <a
          href="#edit-log-modal"
          className={`modal-trigger ${
            log.authentication ? "red-text" : "blue-text"
          }`}
        >
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID: #{log.id}</span> last updated by{" "}
          <span className="black-text">{log.tech}</span> on {log.date}
        </span>
        <a href="#!" className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>{" "}
        {normalDate}
      </div>
    </li>
  );
};

LogItem.propTypes = { log: PropTypes.object.isRequired };

export default LogItem;

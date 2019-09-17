import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import * as logActions from "../../actions/logActions";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import uuid from "uuid";

const techsss = [
  {
    id: 1,
    firstName: "Jhon",
    lastName: "Doe"
  },
  {
    id: 2,
    firstName: "Sam",
    lastName: "Smith"
  },
  {
    id: 3,
    firstName: "Sara",
    lastName: "Wilson"
  }
];

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState("");
  const [authentication, setAuthentication] = useState(false);
  const [tech, setTech] = useState("");

  const foo = () => {
    return techsss.map(tech1 => (
      <option
        key={tech1.id}
        value={`${tech1.firstName} ${tech1.lastName}`}
      >{`${tech1.firstName} ${tech1.lastName}`}</option>
    ));
  };

  const onSubmit = () => {
    const log = {
      // Uncomment next line if you like long Id's
      // id: uuid.v4(),
      authentication,
      date: moment().unix(),
      message,
      tech
    };
    if (log.message === "" || log.tech === "") {
      M.toast({ html: "Please enter a message and select a technic" });
    } else {
      addLog(log);

      M.toast({ html: `Log is added by ${log.tech}` });

      setMessage("");
      setTech("");
      setAuthentication(false);
      M.Modal.getInstance(document.getElementById("add-log-modal")).close();
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <label htmlFor="message" className="active">
              Log Message
            </label>
            <input
              type="text"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              type="text"
              name="name"
              value={tech}
              onChange={e => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              {foo()}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={authentication}
                  value={authentication}
                  onChange={e => setAuthentication(!authentication)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.prototype = {
  addLog: PropTypes.func.isRequired
};

const modalStyle = { width: "75%", height: "75%" };

export default connect(
  null,
  logActions
)(AddLogModal);

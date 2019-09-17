import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

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

const AddLogModal = () => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
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
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      console.log({ message, attention, tech });
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
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
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
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = { width: "75%", height: "75%" };

export default AddLogModal;

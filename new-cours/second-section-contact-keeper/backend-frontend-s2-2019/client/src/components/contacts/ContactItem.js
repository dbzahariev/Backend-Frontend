import ContactContext from "../../context/contact/contactContext";
import PropTypes from "prop-types";
import React from "react";

const ContactItem = ({ contact }) => {
  const {
    deleteContact,
    setCurrent,
    clearCurrent,
    getContacts
  } = React.useContext(ContactContext);
  let { name, email, phone, type } = contact;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        {type && (
          <span
            style={{ float: "right" }}
            className={
              "badge " +
              (type === "professional" ? "badge-success" : "badge-primary")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )}
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btn-sm"
        onClick={() => {
          setCurrent(contact);
        }}
      >
        Edit
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          deleteContact(contact._id);
          clearCurrent();
          getContacts();
        }}
      >
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;

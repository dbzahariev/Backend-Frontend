import ContactContext from "../../context/contact/contactContext";
import React from "react";

const ContactFilter = () => {
  const { clearFilter, filteredContacts } = React.useContext(ContactContext);
  const text = React.useRef("");

  const onChange = e => {
    clearFilter();
    if (text.current.value !== "") {
      filteredContacts(text.current.value);
    } else {
      clearFilter();
    }
  };

  const handleSubmit = () => {
    filteredContacts(text);
  };

  return (
    <React.Fragment>
      <input
        ref={text}
        type="text"
        placeholder="Text"
        id="text"
        onChange={onChange}
      />
      <button className="btn btn-primary btn-block" onClick={handleSubmit}>
        Send
      </button>
    </React.Fragment>
  );
};

export default ContactFilter;

import ContactContext from "../../context/contact/contactContext";
import React from "react";

const ContactFilter = () => {
  const contactContext = React.useContext(ContactContext);
  const text = React.useRef("");

  const onChange = e => {
    contactContext.clearFilter();
    if (text.current.value !== "") {
      contactContext.filteredContacts(text.current.value);
    } else {
      contactContext.clearFilter();
    }
  };

  const handleSubmit = e => {
    contactContext.filteredContacts(text);
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

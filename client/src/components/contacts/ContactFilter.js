import ContactContext from "../../context/contact/contactContext";
import React from "react";

const ContactFilter = () => {
  const { clearFilter, filteredContacts } = React.useContext(ContactContext);
  const text = React.useRef("");

  const onChange = e => {
    if (text.current.value !== "") {
      filteredContacts(text.current.value);
    } else {
      clearFilter();
    }
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
    </React.Fragment>
  );
};

export default ContactFilter;

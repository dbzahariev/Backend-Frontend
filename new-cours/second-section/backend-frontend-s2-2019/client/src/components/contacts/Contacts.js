import ContactContext from "../../context/contact/contactContext";
import ContactFilter from "./ContactFilter";
import ContactItem from "./ContactItem";
import React from "react";

const Contacts = () => {
  const contactContext = React.useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  return (
    <React.Fragment>
      <ContactFilter />
      <br />
      <hr />
      {filtered
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts
        ? contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : null}
    </React.Fragment>
  );
};

export default Contacts;

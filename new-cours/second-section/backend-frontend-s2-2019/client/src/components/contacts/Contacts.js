import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import React from "react";

const Contacts = () => {
  const contactContext = React.useContext(ContactContext);

  const { contacts } = contactContext;
  return (
    <React.Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </React.Fragment>
  );
};

export default Contacts;

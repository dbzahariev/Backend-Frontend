import ContactContext from "../../context/contact/contactContext";
import ContactFilter from "./ContactFilter";
import ContactItem from "./ContactItem";
import React from "react";

const Contacts = () => {
  const contactContext = React.useContext(ContactContext);

  const { contacts, filtered, getContacts } = contactContext;

  React.useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <ContactFilter />
      {filtered ? (
        filtered.map(contact => (
          <ContactItem key={contact._id} contact={contact} />
        ))
      ) : contacts.length > 0 ? (
        contacts.map(contact => (
          <ContactItem key={contact._id} contact={contact} />
        ))
      ) : (
        <h4 className="text-center bg-danger">Please add contact</h4>
      )}
    </React.Fragment>
  );
};

export default Contacts;

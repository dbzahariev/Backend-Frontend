import ContactContext from "../../context/contact/contactContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactFilter from "./ContactFilter";
import ContactItem from "./ContactItem";
import React from "react";

const Contacts = () => {
  const contactContext = React.useContext(ContactContext);
  contactContext.getContacts();

  const { contacts, filtered, loading, getContacts } = contactContext;

  React.useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <TransitionGroup>
        <ContactFilter />
        <br />
        <hr />
        {filtered ? (
          filtered.map(contact => (
            <CSSTransition key={contact._id} timeout={1000} classNames="item">
              <ContactItem key={contact._id} contact={contact} />
            </CSSTransition>
          ))
        ) : contacts.length > 0 ? (
          contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={1000} classNames="item">
              <ContactItem key={contact._id} contact={contact} />
            </CSSTransition>
          ))
        ) : !loading ? (
          <React.Fragment>
            <br />
            <h4 className="text-center bg-danger">Please add contact</h4>
          </React.Fragment>
        ) : null}
      </TransitionGroup>
    </React.Fragment>
  );
};

export default Contacts;

// import {
//   ADD_CONTACT,
//   CLEAR_CURRENT,
//   CLEAR_FILTER,
//   DELETE_CONTACT,
//   FILTER_CONTACTS,
//   SET_CURRENT,
//   UPDATE_CONTACT
// } from "../types";

import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import React from "react";

// import uuid from "uuid";

const ContactStates = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johnson",
        email: "jill@gmail.com",
        phone: "111-111-1111",
        type: "personal"
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-3333",
        type: "professional"
      },
      {
        id: 4,
        name: "No Email",
        phone: "333-333-3333",
        type: "professional"
      },
      {
        id: 5,
        name: "No Phone",
        email: "harry@gmail.com",
        type: "professional"
      },
      {
        id: 6,
        name: "No Params",
        type: "professional"
      },
      {
        id: 7,
        name: "No Params"
      }
    ]
  };
  const [state] = React.useReducer(ContactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactStates;

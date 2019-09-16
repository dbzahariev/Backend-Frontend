import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_CONTACT,
  FILTER_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from "../types";

import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import React from "react";
import axios from "axios";

const ContactStates = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = React.useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = async contact => {
    try {
      const res = await axios.post("/api/contacts", contact);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.errors[0]
      });
    }
  };

  // Clear Contacts
  const clearContacts = async () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };

  // Get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.errors[0]
      });
    }
  };

  // Delete Contact
  const deleteContact = contact => {
    dispatch({
      type: DELETE_CONTACT,
      payload: contact
    });
  };

  // Set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact
    });
  };

  // Filtered Contacts
  const filteredContacts = regex => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: regex
    });
  };

  // Clear Contacts
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filteredContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};
export default ContactStates;

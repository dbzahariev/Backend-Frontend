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

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return { ...state, contacts: action.payload };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        )
      };

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        filter: null,
        error: null
      };

    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            contact.name.match(regex) ||
            contact.email.match(regex) ||
            contact.phone.match(regex) ||
            contact.type.match(regex)
          );
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(el => el._id !== action.payload),
        loading: false
      };

    case CONTACT_ERROR:
      return { ...state, error: action.payload };

    case SET_CURRENT:
      return { ...state, current: action.payload };

    case CLEAR_CURRENT:
      return { ...state, current: null };

    default:
      return state;
  }
};

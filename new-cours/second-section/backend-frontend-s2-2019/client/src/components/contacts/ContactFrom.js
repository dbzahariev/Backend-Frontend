import ContactContext from "../../context/contact/contactContext";
import React from "react";

const initialContact = { name: "", email: "", phone: "", type: "personal" };

const ContactFrom = () => {
  const contactContext = React.useContext(ContactContext);
  let { current, clearCurrent } = contactContext;
  const [name, setName] = React.useState(initialContact.name);
  const [email, setEmail] = React.useState(initialContact.email);
  const [phone, setPhone] = React.useState(initialContact.phone);
  const [type, setType] = React.useState(initialContact.type);

  React.useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const setContact = contact => {
    const { name, email, phone, type } = contact;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setType(type);
  };

  const onChange = e => {
    setContact({ name, email, phone, type, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!current) contactContext.addContact({ name, email, phone, type });
    else
      contactContext.updateContact({
        id: current.id,
        name,
        email,
        phone,
        type
      });
    clearContact();
  };

  const clearContact = () => {
    setContact(initialContact);
    clearCurrent();
  };

  return (
    <React.Fragment>
      <h2 className="text-primary">{current ? "Edit" : "Add"} contact</h2>
      <input
        type="text"
        placeholder="Name"
        id="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        id="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        id="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type="radio"
        placeholder="Type"
        id="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        placeholder="Type"
        id="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div className={current ? "grid-2" : "grid-1"}>
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          {current ? "Update" : "Add"} contact
        </button>
        {current && (
          <button className="btn btn-danger btn-block" onClick={clearContact}>
            Clear contact
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default ContactFrom;

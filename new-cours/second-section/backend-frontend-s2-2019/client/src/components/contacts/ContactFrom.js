import ContactContext from "../../context/contact/contactContext";
import React from "react";

const ContactFrom = () => {
  const contactContext = React.useContext(ContactContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [type, setType] = React.useState("personal");

  const onChange = e => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    else if (id === "email") setEmail(value);
    else if (id === "phone") setPhone(value);
    else if (id === "type") setType(value);
    else console.error(`(ContactFrom) Not available Name of field: ${name}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const contact = { name, email, phone, type };
    contactContext.addContact(contact);
    setName("");
    setEmail("");
    setPhone("");
    setType("personal");
  };

  return (
    <React.Fragment>
      <h2 className="text-primary">Add contact</h2>
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
      <button className="btn btn-primary btn-block" onClick={handleSubmit}>
        Add contact
      </button>
    </React.Fragment>
  );
};

export default ContactFrom;

import ContactContext from "../../context/contact/contactContext";
import React from "react";

const ContactFrom = () => {
  const contactContext = React.useContext(ContactContext);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [type, setType] = React.useState("personal");

  const onChange = e => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "phone") setPhone(value);
    if (name === "type") setType(value);

    console.log(e);
  };

  const onSubmit = e => {
    e.preventDefault();
    const contact = { name, email, phone, type };
    contactContext.addContact(contact);
    setName("");
    setEmail("");
    setPhone("");
    setType("personal");
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add contact</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact type</h5>
      <input
        type="radio"
        placeholder="Type"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        placeholder="Type"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value="Add contact"
          className="btn btn-primary btn-block"
        ></input>
      </div>
    </form>
  );
};

export default ContactFrom;

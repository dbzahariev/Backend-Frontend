import ContactFrom from "../../components/contacts/ContactFrom";
import Contacts from "./../contacts/Contacts";
import React from "react";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactFrom />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;

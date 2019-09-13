import ContactFrom from "../../components/contacts/ContactFrom";
import Contacts from "./../contacts/Contacts";
import React from "react";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      authContext.loadUser();
    }
    // eslint-disable-next-line
  }, []);

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

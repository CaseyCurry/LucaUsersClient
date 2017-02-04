import React from "react";
import AuthenticationContainer from "../authentication/AuthenticationContainer";
import RegistrationContainer from "../registration/RegistrationContainer";

const Home = ({displayAuthentication}) => {
  if (displayAuthentication) {
    return <AuthenticationContainer/>;
  }
  return <RegistrationContainer/>;
};

Home.propTypes = {
  displayAuthentication: React.PropTypes.bool.isRequired
};

export default Home;

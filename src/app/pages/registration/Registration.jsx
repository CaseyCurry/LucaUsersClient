import React from "react";
import zxcvbn from "zxcvbn";
import Field from "../../components/Field";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";

const Registration = ({
  token,
  email,
  password,
  confirmedPassword,
  duplicateEmail,
  error,
  handlers
}) => {
  if (token) {
    return handlers.handleSuccessfulAuthentication(token);
  }
  const passwordStrength = checkPasswordStrength(password);
  return <div className="authentication">
    <form onSubmit={handlers.handleSubmit}>
      <div className="field">
        <Field
          type="text"
          placeholder="enter your email"
          onChange={handlers.handleEmailChange}
          onValidation={() => validateEmail(email)}/> {duplicateEmail && <span className="error">This email is already registered.</span>}
        {error && <span className="error">{error}</span>}
      </div>
      <PasswordStrengthMeter
        strength={password
        ? passwordStrength
        : -1}/>
      <div className="field">
        <Field
          type="password"
          placeholder="enter your password"
          onChange={handlers.handlePasswordChange}
          onValidation={() => validatePassword(password, passwordStrength)}/>
      </div>
      <div className="field">
        <Field
          type="password"
          placeholder="confirm your password"
          onChange={handlers.handleConfirmedPasswordChange}
          onValidation={() => validateConfirmedPassword(password, confirmedPassword)}/>
      </div>
      <div className="buttons">
        <input
          type="submit"
          value="Submit"
          disabled={!isFormValid(email, password, confirmedPassword, error)}/>
        <input
          type="button"
          value="Cancel"
          onClick={handlers.handleCancelClick}/>
      </div>
    </form>
  </div>;
};

Registration.propTypes = {
  token: React.PropTypes.string,
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  confirmedPassword: React.PropTypes.string,
  duplicateEmail: React.PropTypes.bool,
  error: React.PropTypes.string,
  handlers: React.PropTypes.object.isRequired
};

export default Registration;

const validateEmail = (email) => {
  if (isRequiredFieldEmpty(email)) {
    return "Your email is required.";
  }
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email)) {
    return "Your email has an invalid format.";
  }
};

const validatePassword = (email, passwordStrength) => {
  if (isRequiredFieldEmpty(email)) {
    return "Your password is required.";
  }
  const minimumPasswordStrength = 3;
  if (passwordStrength < minimumPasswordStrength) {
    return "Your password is too weak.";
  }
};

const validateConfirmedPassword = (password, confirmedPassword) => {
  if (password != confirmedPassword) {
    return "Your passwords don't match.";
  }
};

const isRequiredFieldEmpty = (value) => {
  return value == false;
};

const isFormValid = (email, password, confirmedPassword, error) => {
  if (validateEmail(email)) {
    return false;
  }
  if (validatePassword(password)) {
    return false;
  }
  if (validateConfirmedPassword(password, confirmedPassword)) {
    return false;
  }
  if (error) {
    return false;
  }
  return true;
};

const checkPasswordStrength = (password) => {
  if (!password) {
    return 0;
  }
  return zxcvbn(password).score;
};

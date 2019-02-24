import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import hashPassword from "../../services/hash-password";
import Register from "./Register";
import notifications from "../../components/notifications/actions";
import { usersAppSvcsUrl } from "../../../config/settings";

class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: uuidv4(),
      email: null,
      password: null,
      confirmedPassword: null,
      isRegistering: false,
      isFormValid: false
    };
  }

  isEmailValid(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email || this.state.email);
  }

  changeEmail(email) {
    if (email === this.state.email) {
      return;
    }
    if (!email) {
      this.props.dispatch(
        notifications.addError({
          message: "Your email is required"
        })
      );
    } else if (!this.isEmailValid(email)) {
      this.props.dispatch(
        notifications.addError({
          message: "Your email is invalid"
        })
      );
    }
    const isFormValid =
      this.isEmailValid(email) &&
      this.isPasswordValid() &&
      this.isConfirmedPasswordValid(
        this.state.confirmedPassword,
        this.state.password
      )
        ? true
        : false;
    this.setState({ ...this.state, email, isFormValid });
  }

  isPasswordValid(password) {
    password = password || this.state.password;
    return password && password.length >= 8;
  }

  changePassword(password) {
    if (password === this.state.password) {
      return;
    }
    if (!password) {
      this.props.dispatch(
        notifications.addError({
          message: "Your password is required"
        })
      );
    } else if (!this.isPasswordValid(password)) {
      this.props.dispatch(
        notifications.addError({
          message:
            "Your password must be at least 8 characters and must be confirmed"
        })
      );
    }
    const isFormValid =
      this.isEmailValid() &&
      this.isPasswordValid(password) &&
      this.isConfirmedPasswordValid(this.state.confirmedPassword, password)
        ? true
        : false;
    this.setState({ ...this.state, password, isFormValid });
  }

  isConfirmedPasswordValid(confirmedPassword, password) {
    return confirmedPassword === password;
  }

  changeConfirmedPassword(confirmedPassword) {
    if (confirmedPassword === this.state.confirmedPassword) {
      return;
    }
    if (!confirmedPassword) {
      this.props.dispatch(
        notifications.addError({
          message: "You must confirm your password"
        })
      );
    } else if (
      !this.isConfirmedPasswordValid(confirmedPassword, this.state.password)
    ) {
      this.props.dispatch(
        notifications.addError({
          message: "Your passwords must match"
        })
      );
    }
    const isFormValid =
      this.isEmailValid() &&
      this.isPasswordValid() &&
      this.isConfirmedPasswordValid(confirmedPassword, this.state.password)
        ? true
        : false;
    this.setState({ ...this.state, confirmedPassword, isFormValid });
  }

  register() {
    let isRegistering = true;
    this.setState({ ...this.state, isRegistering });
    const password = hashPassword(this.state.password, this.state.email);
    fetch(`${usersAppSvcsUrl}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.userId,
        email: this.state.email,
        password
      })
    })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          this.props.dispatch(
            notifications.addError({
              message:
                "Registration failed. Your email must be valid and your password must be at least 8 characters."
            })
          );
          const isFormValid = false;
          isRegistering = false;
          this.setState({ ...this.state, isRegistering, isFormValid });
          return;
        }
        response.text().then(token => {
          console.log(token);
        });
        const isFormValid = false;
        isRegistering = false;
        this.setState({ ...this.state, isRegistering, isFormValid });
      })
      .catch(() => {
        const isFormValid = false;
        isRegistering = false;
        this.setState({ ...this.state, isRegistering, isFormValid });
        this.props.dispatch(
          notifications.addError({
            message: "An error occurred on the client registering"
          })
        );
      });
  }

  render() {
    return (
      <Register
        email={this.state.email}
        password={this.state.password}
        onChangeEmail={this.changeEmail.bind(this)}
        onChangePassword={this.changePassword.bind(this)}
        onChangeConfirmedPassword={this.changeConfirmedPassword.bind(this)}
        onRegister={this.register.bind(this)}
        isRegistering={this.state.isRegistering}
        isFormValid={this.state.isFormValid}
      />
    );
  }
}

RegisterContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapDispatchToProps)(RegisterContainer);

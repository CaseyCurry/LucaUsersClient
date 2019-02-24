import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import hashPassword from "../../services/hash-password";
import Login from "./Login";
import notifications from "../../components/notifications/actions";
import { usersAppSvcsUrl } from "../../../config/settings";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoggingIn: false,
      isFormValid: false
    };
  }

  changeEmail(email) {
    if (!email) {
      this.props.dispatch(
        notifications.addError({
          message: "Your email is required"
        })
      );
    }
    const isFormValid = email && this.state.password ? true : false;
    this.setState({ ...this.state, email, isFormValid });
  }

  changePassword(password) {
    if (!password) {
      this.props.dispatch(
        notifications.addError({
          message: "Your password is required"
        })
      );
    }
    const isFormValid = password && this.state.email ? true : false;
    this.setState({ ...this.state, password, isFormValid });
  }

  login() {
    let isLoggingIn = true;
    this.setState({ ...this.state, isLoggingIn });
    const password = hashPassword(this.state.password, this.state.email);
    fetch(`${usersAppSvcsUrl}users/authenticated?email=${this.state.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          this.props.dispatch(
            notifications.addError({
              message: "Your email or password is invalid"
            })
          );
          const isFormValid = false;
          isLoggingIn = false;
          this.setState({ ...this.state, isLoggingIn, isFormValid });
          return;
        }
        response.text().then(token => {
          const isFormValid = false;
          isLoggingIn = false;
          this.setState({ ...this.state, isLoggingIn, isFormValid });
          console.log(token);
        });
      })
      .catch(() => {
        const isFormValid = false;
        isLoggingIn = false;
        this.setState({ ...this.state, isLoggingIn, isFormValid });
        this.props.dispatch(
          notifications.addError({
            message: "An error occurred on the client logging in"
          })
        );
      });
  }

  render() {
    return (
      <Login
        email={this.state.email}
        password={this.state.password}
        onChangeEmail={this.changeEmail.bind(this)}
        onChangePassword={this.changePassword.bind(this)}
        onLogin={this.login.bind(this)}
        isLoggingIn={this.state.isLoggingIn}
        isFormValid={this.state.isFormValid}
      />
    );
  }
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapDispatchToProps)(LoginContainer);

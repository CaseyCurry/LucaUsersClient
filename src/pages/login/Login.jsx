import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../../controls/Loader";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login">
        <input
          placeholder="email address"
          onBlur={e => this.props.onChangeEmail(e.target.value)}
        />
        <input
          placeholder="password"
          onBlur={e => this.props.onChangePassword(e.target.value)}
        />
        {this.props.isLoggingIn && (
          <button>
            logging in
            <Loader />
          </button>
        )}
        {!this.props.isLoggingIn && (
          <button
            disabled={!this.props.isFormValid}
            onClick={e => {
              this.props.onLogin();
              e.stopPropagation();
            }}
          >
            login
          </button>
        )}
        <Link to={"/register"}>register</Link>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired
};

export default Login;

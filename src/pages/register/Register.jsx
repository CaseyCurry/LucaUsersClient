import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../../controls/Loader";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="register">
        <input
          placeholder="email address"
          onBlur={e => this.props.onChangeEmail(e.target.value)}
        />
        <input
          placeholder="password"
          onBlur={e => this.props.onChangePassword(e.target.value)}
        />
        <input
          placeholder="confirm password"
          onBlur={e => this.props.onChangeConfirmedPassword(e.target.value)}
        />
        {this.props.isRegistering && (
          <button>
            registering
            <Loader />
          </button>
        )}
        {!this.props.isRegistering && (
          <button
            disabled={!this.props.isFormValid}
            onClick={e => {
              this.props.onRegister();
              e.stopPropagation();
            }}
          >
            register
          </button>
        )}
        <Link to={"/login"}>
          <button>cancel</button>
        </Link>
      </div>
    );
  }
}

Register.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeConfirmedPassword: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  isFormValid: PropTypes.bool.isRequired
};

export default Register;

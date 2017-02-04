import {connect} from "react-redux";
import * as actions from "./actions";
import hashPassword from "../../modules/hash-password";
import Registration from "./Registration";

const mapStateToProps = (state) => {
  const props = {
    token: state.registration.token,
    email: state.registration.email,
    password: state.registration.password,
    confirmedPassword: state.registration.confirmedPassword,
    duplicateEmail: state.registration.duplicateEmail,
    error: state.registration.error,
    handleSuccessfulAuthentication: state.app.handleSuccessfulAuthentication
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    handlers: {
      handleCancelClick: () => {
        dispatch(actions.cancelRegistration);
      },
      handleEmailChange: (event) => {
        dispatch(actions.changeEmail(event.target.value));
      },
      handlePasswordChange: (event) => {
        dispatch(actions.changePassword(event.target.value));
      },
      handleConfirmedPasswordChange: (event) => {
        dispatch(actions.changeConfirmedPassword(event.target.value));
      }
    }
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  dispatchProps.handlers.handleSuccessfulAuthentication = stateProps.handleSuccessfulAuthentication;
  dispatchProps.handlers.handleSubmit = (event) => {
    event.preventDefault();
    const hashed = hashPassword(stateProps.password);
    dispatchProps.dispatch(actions.submitRegistration(stateProps.email, hashed));
  };
  return Object.assign({}, stateProps, dispatchProps);
};

const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Registration);

export default RegistrationContainer;

const initialState = {
  processing: false,
  error: null,
  duplicateEmail: false,
  email: "",
  password: "",
  confirmedPassword: ""
};
const submitRegistrationActionName = "SUBMIT_REGISTRATION";

const registration = (state = initialState, action) => {
  switch (action.type) {
    case "CANCEL_REGISTRATION":
      return initialState;
    case "CHANGE_EMAIL":
      return Object.assign({}, state, initialState, {
        email: action.value,
        password: state.password,
        confirmedPassword: state.confirmedPassword
      });
    case "CHANGE_PASSWORD":
      return Object.assign({}, state, initialState, {
        email: state.email,
        password: action.value,
        confirmedPassword: state.confirmedPassword
      });
    case "CHANGE_CONFIRMED_PASSWORD":
      return Object.assign({}, state, initialState, {
        email: state.email,
        password: state.password,
        confirmedPassword: action.value
      });
    case `${submitRegistrationActionName}_PENDING`:
      return Object.assign({}, state, initialState, {
        processing: true,
        email: state.email,
        password: state.password,
        confirmedPassword: state.confirmedPassword
      });
    case `${submitRegistrationActionName}_REJECTED`:
      return Object.assign({}, state, initialState, {
        error: action.payload,
        email: state.email,
        password: state.password,
        confirmedPassword: state.confirmedPassword
      });
    case `${submitRegistrationActionName}_FULFILLED`:
      switch (action.payload.status) {
        case 200:
          return Object.assign({}, state, initialState, {
            token: action.payload.data
          });
        case 409:
          return Object.assign({}, state, initialState, {
            duplicateEmail: true,
            email: state.email,
            password: state.password,
            confirmedPassword: state.confirmedPassword
          });
      }
      return state;
  }
  return state;
};

export default registration;

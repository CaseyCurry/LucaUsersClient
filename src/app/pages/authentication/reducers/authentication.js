const initialState = {
  processing: false,
  error: null,
  invalidPassword: false,
  emailNotFound: false,
  email: "",
  password: ""
};
const submitAuthenticationActionName = "SUBMIT_AUTHENTICATION";

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_REGISTRATION":
      return initialState;
    case "CHANGE_EMAIL":
      return Object.assign({}, state, initialState, {
        email: action.value,
        password: state.password,
        invalidPassword: state.invalidPassword
      });
    case "CHANGE_PASSWORD":
      return Object.assign({}, state, initialState, {
        password: action.value,
        email: state.email,
        emailNotFound: state.emailNotFound
      });
    case `${submitAuthenticationActionName}_PENDING`:
      return Object.assign({}, state, initialState, {
        processing: true,
        email: state.email,
        password: state.password
      });
    case `${submitAuthenticationActionName}_REJECTED`:
      return Object.assign({}, state, initialState, {
        error: action.payload,
        email: state.email,
        password: state.password
      });
    case `${submitAuthenticationActionName}_FULFILLED`:
      switch (action.payload.status) {
        case 200:
          return Object.assign({}, state, initialState, {
            token: action.payload.data
          });
        case 401:
          return Object.assign({}, state, initialState, {
            invalidPassword: true,
            email: state.email,
            password: state.password
          });
        case 404:
          return Object.assign({}, state, initialState, {
            emailNotFound: true,
            email: state.email,
            password: state.password
          });
      }
      return state;
  }
  return state;
};

export default authentication;

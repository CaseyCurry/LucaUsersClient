const initialState = {
  displayAuthentication: true
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS_HANDLER":
      return Object.assign({}, state, {
        handleSuccessfulAuthentication: action.handleSuccessfulAuthentication
      });
    case "DISPLAY_REGISTRATION":
      return Object.assign({}, state, {
        displayAuthentication: false
      });
    case "CANCEL_REGISTRATION":
      return Object.assign({}, state, {
        displayAuthentication: true
      });
  }
  return state;
};

export default users;

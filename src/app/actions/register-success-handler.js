const action = (handleSuccessfulAuthentication) => {
  return {
    type: "REGISTER_SUCCESS_HANDLER",
    handleSuccessfulAuthentication
  };
};

export default action;

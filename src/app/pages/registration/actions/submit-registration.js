const action = (api) => {
  return (email, password) => {
    const url = api.getUrl();
    return {
      type: "SUBMIT_REGISTRATION",
      payload: api.client.post(url, {
        "email": email,
        "password": password
      }, {
        validateStatus: (status) => {
          console.log(status);
          return status == 200 || status == 409;
        }
      })
    };
  };
};

export default action;

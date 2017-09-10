const action = (api) => {
  return (email, password) => {
    return {
      type: "SUBMIT_REGISTRATION",
      payload: api.getUrl()
        .then(url => {
          return api.client.post(url, {
            "email": email,
            "password": password
          }, {
            validateStatus: (status) => {
              console.log(status);
              return status == 200 || status == 409;
            }
          });
        })
        .catch(error => {
          Promise.reject(error);
        })
    };
  };
};

export default action;

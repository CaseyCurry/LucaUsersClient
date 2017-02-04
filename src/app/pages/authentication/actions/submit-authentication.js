const action = (api) => {
  return (email, password) => {
    return {
      type: "SUBMIT_AUTHENTICATION",
      payload: api.getUrl()
        .then(url => {
          return api.client.post(`${url}/${encodeURIComponent(email)}`, {
            "password": password
          }, {
            validateStatus: (status) => {
              console.log(status);
              return status == 200 || status == 401 || status == 404;
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

const action = (api) => {
  return (email, password) => {
    const url = api.getUrl();
    return {
      type: "SUBMIT_AUTHENTICATION",
      payload: api.client.post(`${url}/${encodeURIComponent(email)}`, {
        "password": password
      }, {
        validateStatus: (status) => {
          console.log(status);
          return status == 200 || status == 401 || status == 404;
        }
      })
    };
  };
};

export default action;

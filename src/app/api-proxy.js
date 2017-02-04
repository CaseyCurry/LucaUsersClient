import axios from "axios";
import serviceRegistry from "luca-service-registry-library";

const api = {
  client: axios,
  getUrl: () => {
    return serviceRegistry.locate("users-api")
      .then(url => {
        return `${url}/api/users`;
      });
  }
};

export default api;

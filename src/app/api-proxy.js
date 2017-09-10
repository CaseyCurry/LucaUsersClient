import axios from "axios";

const api = {
  client: axios,
  getUrl: () => {
    return new Promise((resolve) => {
      resolve("http://192.168.56.110/api/users");
    });
  }
};

export default api;

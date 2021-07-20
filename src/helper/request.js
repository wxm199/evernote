import axios from "axios";

// axios.defaults.baseURL = "https://note-server.hunger-valley.com/";
axios.defaults.baseURL = process.env.VUE_APP_URL;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;
import { Message } from "element-ui";
export default function (url, type = "GET", data = {}) {
  return new Promise((resolve) => {
    const option = {
      url,
      method: type,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 400;
      },
    };
    if (type.toLowerCase() == "get") {
      option.params = data;
    } else {
      option.data = data;
    }

    return axios(option)
      .then((res) => {
        if (res.status == 200) resolve(res.data);
        else {
          Message.error({ message: res.data.msg });
          // reject(res);
        }
      })
      .catch((err) => {
        Message.error({ message: err });
        // reject(err);
      });
  });
}

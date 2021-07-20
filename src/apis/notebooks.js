import request from "@/helper/request.js";
import { formatTime } from "@/helper/util";
const URL = {
  GETALL: "notebooks",
  ADD: "notebooks",
  DELETE: "notebooks/:id",
  EDIT: "notebooks/:id",
};

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GETALL)
        .then((res) => {
          res.data.sort((n1, n2) => (n1.createdAt < n2.createdAt ? 1 : -1));
          res.data.forEach((notebook) => {
            notebook.friendlyCreatedAt = formatTime(notebook.createdAt);
          });
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  add(title) {
    return request(URL.ADD, "POST", { title });
  },

  del(id) {
    return request(URL.DELETE.replace(":id", id), "DELETE");
  },

  edit(id, title) {
    return request(URL.EDIT.replace(":id", id), "PATCH", { title });
  },
};

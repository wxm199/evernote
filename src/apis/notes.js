import request from "@/helper/request";
import { formatTime } from "@/helper/util";

const URL = {
  GET_ALL: "notes/from/:notebookId",
  ADD_NOTE: "notes/to/:notebookId",
  UPDATE: "notes/:noteId",
  DELETE: "notes/:noteId",
};

export default {
  getAll(notebookId) {
    return new Promise((resolve, reject) => {
      request(URL.GET_ALL.replace(":notebookId", notebookId))
        .then((res) => {
          res.data.forEach((notebook) => {
            notebook.friendlyCreatedAt = formatTime(notebook.createdAt);
            notebook.friendlyUpdatedAt = formatTime(notebook.updatedAt);
          });
          res.data.sort((note1, note2) =>
            note1.createdAt < note2.createdAt ? 1 : -1
          );
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addNote(notebookId, title = "", content = "") {
    return request(URL.ADD_NOTE.replace(":notebookId", notebookId), "POST", {
      title,
      content,
    });
  },
  update(noteId, title, content) {
    return request(URL.UPDATE.replace(":noteId", noteId), "PATCH", {
      title,
      content,
    });
  },
  delete(noteId) {
    return request(URL.DELETE.replace(":noteId", noteId), "DELETE");
  },
};

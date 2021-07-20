// import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";
const notes = {
  state: {
    notes: null,
  },
  getters: {
    notes: (state) => {
      return state.notes || [];
    },
  },
  mutations: {
    setNotes(state, { notes }) {
      state.notes = notes;
    },
    addNote(state, { newNote }) {
      state.notes.unshift(newNote);
    },
  },
  actions: {
    getNotes({ commit }, { notebookId }) {
      Notes.getAll(notebookId).then((res) => {
        commit("setNotes", { notes: res });
      });
    },
    addNote({ commit }, { curBookId, title }) {
      return new Promise((resolve) => {
        Notes.addNote(curBookId, title).then((res) => {
          res.data.friendlyCreatedAt = "刚刚";
          commit("addNote", { newNote: res.data });
          resolve({ msg: "添加成功" });
        });
      });
    },
  },
};

export default notes;

import Notebooks from "@/apis/notebooks";

const notebooks = {
  state: {
    notebooks: null,
    curBookId: null,
  },
  getters: {
    notebooks: (state) => {
      return state.notebooks || [];
    },
    curBook: (state) => {
      if (state.notebooks === null || state.curBookId === null) return {};
      const curBook = state.notebooks.find(
        (notebook) => notebook.id == state.curBookId
      );
      return curBook;
    },
    curBookId: (state) => state.curBookId,
  },
  mutations: {
    setAllNotebooks(state, { notebooks }) {
      state.notebooks = notebooks;
    },
    setCurBook(state, { curBookId }) {
      state.curBookId = curBookId;
    },
    addNotebook(state, newNotebook) {
      state.notebooks.unshift(newNotebook);
    },
    delNotebook(state, { index }) {
      state.notebooks.splice(index, 1);
    },
    editNotebook(state, { notebookId, newTitle }) {
      state.notebooks.find((notebook) => notebook.id == notebookId).title =
        newTitle;
    },
  },
  actions: {
    getAllNotebooks({ commit }) {
      Notebooks.getAll().then((res) => {
        commit("setAllNotebooks", { notebooks: res });
      });
    },
    addNotebook({ commit }, title) {
      Notebooks.add(title).then((res) => {
        res.data.friendlyCreatedAt = "刚刚";
        commit("addNotebook", res.data);
      });
    },

    delNotebook({ commit }, { index, id }) {
      return new Promise((resolve) => {
        Notebooks.del(id).then(() => {
          commit("delNotebook", { index });
          resolve({ msg: "删除成功" });
        });
      });
    },

    editNotebook({ commit }, { notebookId, newTitle }) {
      return new Promise((resolve) => {
        Notebooks.edit(notebookId, newTitle).then(() => {
          commit("editNotebook", { notebookId, newTitle });
          resolve({ msg: "修改成功" });
        });
      });
    },
  },
};

export default notebooks;

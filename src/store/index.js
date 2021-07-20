import Vue from "vue";
import Vuex from "vuex";
import notebooks from "./notebooks";
import notes from "./notes";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notebooks,
    notes,
  },
});

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/common/stylus/index.stylus";
import {
  Button,
  Input,
  MessageBox,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "element-ui";

// import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app1");

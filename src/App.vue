<template>
  <div id="app">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from "@/components/sidebar";
import { auth } from "@/apis/auth";
import { mapActions } from "vuex";
export default {
  components: {
    Sidebar,
  },
  methods: {
    ...mapActions(["getAllNotebooks"]),
  },
  created() {
    auth()
      .then((res) => {
        if (!res.isLogin) {
          this.$router.push({ path: "/login" });
        } else {
          this.getAllNotebooks();
        }
      })
      .catch((e) => console.log(e));
  },
};
</script>
<style lang="stylus">
#app
  display flex
  height 100%
  font-family:"Microsoft YaHei","微软雅黑",Arial,sans-serif
  font-weight normal
  line-height 1
  -webkit-font-smoothing:antialiased
  background #eee
  // flex-direction
</style>

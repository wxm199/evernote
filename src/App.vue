<template>
  <div id="app">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from "@/components/sidebar";
import { auth } from "@/apis/auth";

auth().then((res) => console.log(res));
export default {
  components: {
    Sidebar,
  },
  methods: {},
};
</script>
<style lang="stylus">
#app
  display flex
  font-family:"Microsoft YaHei","微软雅黑",Arial,sans-serif
  font-weight normal
  line-height 1
  -webkit-font-smoothing:antialiased
  // flex-direction
.content
  width 500px;
  margin 0 auto
  height 100%
  overflow auto
</style>

<template>
  <div class="sidebar">
    <div class="logo">
      <a href="#"><i class="iconfont icon-logo"></i></a>
    </div>
    <nav>
      <router-link to="/note"><i class="iconfont icon-note"></i></router-link
      ><router-link to="/notebooks"
        ><i class="iconfont icon-Note"></i
      ></router-link>
      <router-link to="/trash">
        <i class="iconfont icon-lajitong"></i
      ></router-link>
      <div class="logout" @click="logout">
        <i class="iconfont icon-outcome"></i>
      </div>
    </nav>
  </div>
</template>

<script>
import { logout } from "@/apis/auth";

export default {
  methods: {
    logout() {
      logout()
        .then((res) => {
          this.$message.success({ message: res.msg });
          this.$router.push({ path: "/login" });
        })
        .catch((e) => this.$message.error({ message: e.msg }));
    },
  },
};
</script>

<style lang="stylus" scoped>
.sidebar
  width 56px
  height 100%
  background #2c333c
  padding 10px 0
  display flex
  flex-direction  column
  .logo
    text-align center
    .icon-logo::before
       color #8ac542
       display inline-block
       width 30px
       height 30px
       font-size 30px
  nav
    flex 1
    width 100%
    display flex
    flex-direction column
    padding-top 15px
    align-items center
    .logout
      margin-top auto
      margin-bottom 0
      cursor pointer

    a
      display block
      width 100%
      text-align center
      padding 15px 0
      &:hover .iconfont
        color:#8ac542
    .iconfont
      color white


    //
    // a
    //   width 100%;
    //   display block

    //
    //
</style>

<template>
  <div class="wrapper">
    <div class="content">
      <div class="picture"></div>
      <div class="form">
        <h3 @click="toggle(1)">创建账户</h3>

        <div class="register" :class="{ show: !showLogin }">
          <el-input
            v-model="username"
            placeholder="用户名"
            @input="validUsername"
          ></el-input>
          <el-input
            v-model="password"
            placeholder="密码"
            @input="validPassword"
          ></el-input>
          <p v-if="notice" class="notice">{{ notice }}</p>
          <p v-else>创建账号后，请记住用户名和密码</p>
          <el-button @click="register">创建账户</el-button>
        </div>
        <h3 @click="toggle(2)">登录</h3>
        <div class="login" :class="{ show: showLogin }">
          <el-input
            v-model="username"
            placeholder="用户名"
            @input="validUsername"
          ></el-input>
          <el-input
            v-model="password"
            placeholder="密码"
            @input="validPassword"
          ></el-input>
          <p v-if="notice" class="notice">{{ notice }}</p>
          <p v-else>输入用户名和密码</p>
          <el-button @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/apis/auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      showLogin: true,
      isLegal: false,
      notice: "",
    };
  },
  methods: {
    toggle(val) {
      console.log(val);
      if ((val == 1 && this.showLogin) || (val == 2 && !this.showLogin))
        this.showLogin = !this.showLogin;
    },
    register() {
      if (this.isLegal) {
        register(this.username, this.password).then((res) => console.log(res));
      }
    },
    login() {
      if (this.isLegal) {
        login(this.username, this.password).then((res) => console.log(res));
      }
    },
    validUsername() {
      if (!/[\w\u4e00-\u9fa5]{3,10}/.test(this.username)) {
        this.isLegal = false;
        this.notice = "用户名必须是6-10位长度的数字、英文大小写字母或中文";
      } else {
        this.isLegal = true;
        this.notice = "";
      }
    },
    validPassword() {
      if (!/.{6,10}/.test(this.password)) {
        this.isLegal = false;
        this.notice = "密码必须是6-10位长度的任意字符";
      } else {
        this.isLegal = true;
        this.notice = "";
      }
    },
    handle() {
      console.log("hello");
    },
  },
};
</script>

<style lang="stylus" scoped>
.wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0,0,0,.7)
  display flex
  justify-content center
  align-items center
  .content

    width 800px
    height 500px
    display flex
    background white
    .picture
      flex 1
      background #36bc64 url(http://cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) no-repeat center center
      background-size contain

    .form
      width 270px
      h3
        padding 10px 20px
        border-bottom 1px solid #eee
        cursor pointer
      p
        font-size 12px
        margin-top 10px
        &.notice
          color red
      .register.show
        border-bottom 1px solid #eee
      .register,.login
        padding 0 20px
        height 0
        overflow hidden
        transition height .3s

        &.show
          display block
          height 215px

        .el-input,.el-button
          margin-top 10px
        .el-button
          margin-bottom 10px
          width 100%
          background #36bc64
          color white
</style>

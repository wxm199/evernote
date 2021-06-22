<template>
  <div class="sidebar">
    <div class="logo">
      <a href="#"><i class="iconfont icon-logo"></i></a>
    </div>
    <nav>
      <a href="#"><i class="iconfont icon-note"></i></a
      ><a href="#"><i class="iconfont icon-Note"></i></a>
      <a href="#"> <i class="iconfont icon-lajitong"></i></a>
      <a href="#" class="logout"><i class="iconfont icon-outcome"></i></a>
    </nav>
  </div>
</template>

<script>
export default {};
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
    .logout
      margin-top auto
      margin-bottom 0


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

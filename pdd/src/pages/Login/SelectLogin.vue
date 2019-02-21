<template>
    <div class="select-login">
      <img src="./images/lk_logo_sm.png" alt="" width="200">
      <h4>选择登录方式</h4>
      <router-link tag="button" to="/login">手机登录</router-link>
    </div>
</template>

<script>
    export default {
        name: "SelectLogin"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .select-login
       width 100%
       height 100%
       background-color #f5f5f5
       position fixed
       top 0
       left 0
       display flex
       flex-direction column
       justify-content center
       align-items center
       z-index 1000
       button
          width 80%
          height 3.8rem
          background-color purple
          border-radius 0.5rem
          border none
          font-size 1.4rem
          color white
          margin-top 3rem
       img
         position fixed
         top 13rem
         left 50%
         margin-left -10rem
</style>

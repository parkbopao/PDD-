<template>
    <div class="search-header">
      <a href="javascript:;" class="search-container" @click="isShowPanel(true)">
        <img src="./../images/search.png" alt="">
        <span>拼夕夕商城</span>
      </a>
    </div>
</template>

<script>
  export default {
    name: "SearchNav",
    props:{
      isShowPanel:Function
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    @import "./../../../common/stylus/mixins.styl"
    .search-header
       position fixed
       top 0
       left 0
       z-index 998
       width 100%
       height 6rem
       background-color #fff
       border-bottom-1px(#ccc)
       display flex
       justify-content center
       align-items center
       .search-container
          width 90%
          height 70%
          background-color #e8e8e8
          border-radius 1.5rem
          display flex
          align-items center
          justify-content center
          img
           width 2.5rem
          span
           font-size 1.7rem
           color #aaaaaa
           margin-left 0.6rem
           font-weight lighter
</style>

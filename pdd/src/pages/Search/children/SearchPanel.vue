<template>
  <div class="search-panel">
      <div class="search-input">
          <div class="input-content">
            <img class="input-icon" src="./../images/search.png" alt="" width="25">
            <input ref="mySearch" type="search" placeholder=" 拼夕夕商城"/>
          </div>
          <button @click="isShowPanel(false)">取消</button>
      </div>
      <div class="search-list">
         <div class="search-list-header">
            <img src="./../images/hot.png" alt="" width="25">
            <span>热门搜索</span>
         </div>
          <ul class="search-list-content">
              <li>面纸巾</li>
              <li>浴巾儿童</li>
              <li>石榴水果</li>
              <li>冰箱保鲜盒</li>
              <li>富豪卷纸</li>
              <li>毛巾浴袍</li>
          </ul>
      </div>
  </div>
</template>

<script>
  export default {
    name: "SearchPanel",
    props:{
      isShowPanel:Function
    },
    mounted(){
       this.$refs.mySearch.focus()
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
   @import "./../../../common/stylus/mixins.styl"
   .search-panel
      width 100%
      height 100%
      background-color #fff
      position fixed
      top 0
      left 0
      z-index  1000
      .search-input
         width 100%
         height 6rem
         background-color #fff
         border-bottom-1px(#dddddd)
         padding 0 2rem
         display flex
         justify-content space-between
         align-items center
         .input-content
            display flex
            align-items center
            width 85%
            height 3.8rem
            border-radius 0.5rem
            background-color #EDEDED
            padding 0 1rem
            input
              width 90%
              height 90%
              padding-left 1rem
              font-size 1.6rem
              outline none
              background-color #EDEDED
         button
            background-color transparent
            font-size 1.6rem
            color #aaa
      .search-list
         padding 3rem 1.5rem
         .search-list-header
            display flex
            flex-direction row
            align-items center
            color #aaaaaa
            margin-bottom 1rem
         .search-list-content
            display flex
            flex-wrap wrap
            li
              background-color #EDEDED
              color #aaaaaa
              margin 0.5rem 1.5rem
              padding 0.5rem 0.5rem
              border-radius 1rem
</style>

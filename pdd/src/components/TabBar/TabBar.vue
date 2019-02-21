<template>
  <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/home')" >
      <img :src="changeSelectedIcon('/home',0)" alt=""  >
      <span :class="{'isCurrent': isCurrent('/home')}">首页</span>
    </div>
    <div class="tab-item" @click="switchTo('/recommend')">
      <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected:tabBarImgArr[1].normal" alt="">
      <span :class="{'isCurrent': $route.path.includes('/recommend')}">推荐</span>
    </div>
    <div class="tab-item" @click="switchTo('/search')" >
      <img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected:tabBarImgArr[2].normal" alt="">
      <span  :class="{'isCurrent': $route.path.includes('/search')}">搜索</span>
    </div>
    <div class="tab-item"  @click="switchTo('/cart')">
      <img :src="$route.path.includes('/cart') ? tabBarImgArr[3].selected:tabBarImgArr[3].normal" alt="">
      <span  :class="{'isCurrent': $route.path.includes('/cart')}">购物车</span>
    </div>
    <div class="tab-item"  @click="switchTo('/me')">
      <img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected:tabBarImgArr[4].normal" alt="">
      <span  :class="{'isCurrent': $route.path.includes('/me')}">个人中心</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    data(){
       return {
         //静态资源的引入必须遵循模块化  require或者import引入
           tabBarImgArr:
             [
               {normal: require('./../../common/img/icon_home.png'), selected: require('./../../common/img/icon_home_selected.png')},
               {normal: require('./../../common/img/icon_intro.png'), selected: require('./../../common/img/icon_intro_selected.png')},
               {normal: require('./../../common/img/icon_search.png'), selected: require('./../../common/img/icon_search_selected.png')},
               {normal: require('./../../common/img/icon_chat.png'), selected: require('./../../common/img/icon_chat_selected.png')},
               {normal: require('./../../common/img/icon_mine.png'), selected: require('./../../common/img/icon_mine_selected.png')}
             ]
       }
    },
    methods:{
       switchTo(path){
         console.log(this.$route);
         console.log(this.$router);
           this.$router.replace(path)
       },
      /***
       *
       * @param path  String
       * @returns {*} Boolean
       */
        isCurrent(path){
          return   this.$route.path.includes(path)
        },
      /***
       *
       * @param path  String
       * @param index  Number
       * @returns {*} String
       */
        changeSelectedIcon(path,index){
          return  this.$route.path.includes(path) ? this.tabBarImgArr[index].selected:this.tabBarImgArr[index].normal
        }
    },
    computed:{

    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    .isCurrent
       color red
    .bottom-tab
      width 100%
      height 5rem
      background-color #fff
      position fixed
      left 0
      bottom 0
      z-index 999
      box-shadow 0 -0.2rem 1rem #ccc
      display flex
      .tab-item
        display flex
        flex 1
        flex-direction column
        justify-content center
        align-items center
        font-size 1.2rem
        img
          width 35%
          margin-bottom 0.3rem
</style>

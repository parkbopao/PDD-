<template>
  <div id="wrapper">
<!--    <div @click="getNav">nav</div>-->
    <div id="scroller">
      <ul>
        <li>
           <div v-for="(item,index) in homenav.item1" :key="index">
             <img :src="item.iconurl" alt="" width="100">
             <span v-text="item.icontitle"></span>
           </div>
        </li>
        <li>
          <div v-for="(item,index) in homenav.item2" :key="index">
            <img :src="item.iconurl" alt="" width="100">
            <span v-text="item.icontitle"></span>
          </div>
        </li>
      </ul>
    </div>
    <ul>
      <li  v-for="(item,index) in homenav.item1" :key="index"></li>
    </ul>
  </div>
</template>

<script>
  //引入iscroll插件
  import IScroll from 'iscroll'

  import {mapState} from 'vuex'

    export default {
        name: "HotNav",
        computed:{
          ...mapState(['homenav'])
        },
        mounted(){
          //初始化导航栏数据放在Hot.vue主界面中
          // 初始化iscroll
           new IScroll('#wrapper', {scrollX: true});
           this.$el.addEventListener('touchmove',this.handleTouchMove)
        },
        methods:{
          handleTouchMove(e) {
            // 阻止原生的时间
            e.preventDefault();
            console.log('move()....');
          },
          getNav(){
             console.log(this.homenav)
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   #wrapper
      width 100%
      height 16rem
      position relative
      background-color #fff
      margin-bottom 0.5rem
      #scroller
         width 64rem
         height 18rem
         ul
           width: 100%;
           height 100%
           padding 0
           margin 0
           list-style none
           li
             width 100%
             height 8rem
             display flex
             flex-direction row
             justify-content center
             div
               font-size 1.2rem
               width 8rem
               height 8rem
               display flex
               flex-direction column
               justify-content center
               align-items center
               img
                  width 3.5rem
               span
                  text-align center
                  margin-top 0.5rem

</style>

<template>
  <div id="hot">
<!--    <div @click="getHomeC">hhaa</div>-->
    <!--轮播图-->
    <div class="swiper-container">
      <!--轮播图-->
      <div class="swiper-wrapper">
        <div class="swiper-slide"
           v-for="(casual,index) in homecasual" :key="index"
        >
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <!--分页-->
      <div class="swiper-pagination"></div>
    </div>
    <!--导航栏-->
    <hot-nav/>
    <hot-shop-list></hot-shop-list>
  </div>
</template>

<script>
  import HotNav from './HotNav'
  import HotShopList from  './HotShopList'
  //引入swiper
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  //引入hot界面的数据
  //  1.1引入轮播图数据homecasual
  import {mapState} from 'vuex'
  export default {
    name: "Hot",
    components:{
      HotNav,
      HotShopList
    },
    computed:{
      ...mapState(['homecasual'])
    },
    mounted(){
      //请求轮播数据
      this.$store.dispatch('reqHomeCasual');
       //请求导航数据
      this.$store.dispatch('reqHomeNav');
      //请求商品列表数据
      this.$store.dispatch('reqHomeShopList')
    },
   /* mounted(){
       this.$store.dispatch('reqHomeCasual',()=>{
         this.$nextTick(()=>{
           new Swiper('.swiper-container', {
             autoplay: true,//可选选项，自动滑动
             loop: true,
             pagination: {
               el: '.swiper-pagination',
             },
           })
         })
       })
    },*/
    watch:{
       homecasual(){
           this.$nextTick(()=>{
             new Swiper('.swiper-container', {
               autoplay: true,//可选选项，自动滑动
               loop: true,
               pagination: {
                 el: '.swiper-pagination',
               },
             })
           })
       }
    },
    methods:{
       getHomeC(){
         console.log(this.homecasual);
       }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../../common/stylus/mixins.styl"
  #hot
    width 100%
    height 100%
    padding-top 4rem
    background $bg
    overflow-x hidden !important
</style>

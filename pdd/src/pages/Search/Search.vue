<template>
  <div id="search">
    <!--搜索导航-->
     <search-nav :isShowPanel="isShowPanel"/>
     <div class="shop">
        <!--左边-->
        <div class="menu-wrapper">
            <ul>
               <li
                 class="menu-item"
                 v-for="(goods,index) in searchlist"
                 :key="index"
                 :class="{current: currentIndex === index}"
                 ref="menuList"
                 @click.prevent="clickLeftLi(index)"
               >
                 <span>{{goods.name}}</span>
               </li>
            </ul>
        </div>
        <!--右边-->
        <div class="shop-wrapper">
           <ul>
              <li class="shop-li" v-for="(goods,index) in searchlist" :key="index">
                <!--头部-->
                <div class="shops-title">
                  <h4>{{goods.name}}</h4>
                  <a href="">查看更多 ></a>
                </div>
                <!--内容-->
                <ul class="shops-items">
                   <li v-for="(item,index) in goods.items" :key="index">
                     <img v-lazy="item.icon" alt="">
                     <span>{{item.title}}</span>
                   </li>
                </ul>
              </li>
           </ul>
        </div>
     </div>
    <!--显示面板-->
     <search-panel v-if="isShow" :isShowPanel="isShowPanel" />
  </div>
</template>

<script>
    import SearchNav from './children/SearchNav'
    import SearchPanel from './children/SearchPanel'
    import {mapState} from 'vuex'
    //  引入betterScroll
    import BScroll from 'better-scroll'
    export default {
       name: "Search",
       components:{
           SearchNav,
           SearchPanel
       },
       computed:{
         ...mapState(['searchlist']),
         // 1.4 用来动态决定左侧哪个li被选中
         currentIndex(){
             const {scrollY,rightLiTops} = this ;
             //取出索引
             return rightLiTops.findIndex((liTop,index)=>{
               //这里调用左右联动的方法实现左右的一起调度
                 this._leftScroll(index);

                 return scrollY >= rightLiTops[index] && scrollY < rightLiTops[index + 1]
             })
         },
       },
       data(){
           return {
               isShow:false ,
               scrollY: 0 , //右侧滑动列表的Y轴坐标(实时更新)
               rightLiTops:[] // 右侧所有li头部高度数组
           }
       },
       mounted(){
         this.$store.dispatch('reqSearchList');
       },
       methods:{
         // 1.1 是否显示搜索的面板
          isShowPanel(flag){
             this.isShow = flag
          },
          // 1.2初始化BScroll的func
         _initBScroll(){
            // 1.2.1 左侧视图
            this.leftBScroll = new BScroll('.menu-wrapper',{});
            // 1.2.2 右侧视图
            this.rightBScroll = new BScroll('.shop-wrapper',{
                probeType:3 //滚动的灵敏度监视 0 1 2 3 派发scroll监听事件 配合on监听视图scroll事件
            });
            //1.2.3 监听右侧视图的滚动
            this.rightBScroll.on('scroll',(pos)=>{
                //console.log(pos.x,pos.y)
               this.scrollY = Math.abs(Math.round(pos.y));
            })
         },
         //1.3 初始化右侧所有li的高度数组的func
         _initRightLiTops(){
               let temsArr = [];
               let top = 0 ;
               temsArr.push(top);
               let rightLis = this.$el.getElementsByClassName('shop-li');
               Array.prototype.slice.call(rightLis).forEach((li,index) =>{
                 //这里要判断最后的index 并且最后的li要添加额外的高度 否则左侧无法滚动到最低
                 if(index === rightLis.length -1){
                     li.style.paddingBottom = `${window.innerHeight - li.clientHeight -100}px`
                 }
                   top += li.clientHeight ;
                   temsArr.push(top)
               });
                this.rightLiTops = temsArr
          },
          //点击左侧li标签 右侧滚动到相应位置
          clickLeftLi(index){
               this.scrollY = this.rightLiTops[index] ;
               this.rightBScroll.scrollTo(0,-this.scrollY,300)
          },
          //左右联动
          _leftScroll(index){
             //取出左边所有li
             let menuLis = this.$refs.menuList ;
             let el = menuLis[index];
             this.leftBScroll.scrollToElement(el,0,0,-100)
          }
       },
       watch:{
         //监控searchlist数据加载完成后在初始化BScroll
          searchlist(){
              this.$nextTick(()=>{
                   // 1.2 初始化BScroll
                  this._initBScroll();
                  // 1.3 初始化右侧所有li的高度数组
                  this._initRightLiTops();
                  console.log(this.rightLiTops)
              })
          }
       }

    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
   #search
     background #F5F5F5
     width 100%
     height 100%
     overflow hidden
     .shop
        display flex
        width 100%
        overflow hidden
        position absolute
        top 6rem
        bottom 5rem

        .menu-wrapper
          background-color #eoeoeo
          width: 8rem
          flex 0 0 0 0.8rem
          .menu-item
             width 100%
             height 6rem
             background-color #fafafa
             display flex
             justify-content center
             align-items center
             font-weight lighter
             color #666666
             position relative
          .current
             color #e02e24
          .current::before
             content ''
             background-color #e02e24
             width 0.4rem
             height 3rem
             position absolute
             left 0
        .shop-wrapper
          flex 1
          background-color #fff
          .shops-title
            display: flex
            flex-direction row
            padding 0 1rem
            height  4.4rem
            align-items center
            justify-content space-between
            color: #999
            a
              color #999
              text-decoration none
              font-weight lighter
          .shops-items
            display flex
            flex-wrap wrap
            li
              display flex
              flex-direction column
              width 33.3%
              height 9rem
              justify-content center
              align-items center
              color #666
              font-weight lighter
              font-size 1.4rem
              img
                width 60%
                height 60%
                margin-bottom 0.5rem


</style>

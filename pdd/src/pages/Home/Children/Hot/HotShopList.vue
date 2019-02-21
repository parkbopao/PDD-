<template>
    <div class="shop-container">
       <ul>
          <li class="shop-lists" v-for="(item,index) in homeshoplist.goods_list">
            <img class="item_img" v-lazy="item.image_url" alt="" width="100%">
            <h4 class="goods_name" v-text="item.goods_name" ></h4>
            <div class="shop-list-bottom">
                <div class="shop-list-bottom-left">
                   <span class="list-item-bottom-left-price">{{item.normal_price | normalPrice}}</span>
                   <span>{{item.sales_tip}}</span>
                </div>
                <div class="shop-list-bottom-right">
                  <span class="shop-user">
                    <img v-for="(user,index) in item.bubble" :src="user.avatar" alt="">
                  </span>
                  <div class="shop-btn">去拼单</div>
                </div>
            </div>
          </li>
       </ul>
    </div>
</template>

<script>
   import {mapState} from 'vuex'
    export default {
        name: "HotShopList",
        computed:{
          ...mapState(['homeshoplist'])
        },
        filters:{
           normalPrice(value){
               return '￥'+ value/100
           }
        }
    }
</script>

<style scoped lang="stylus" rel="styleshet/stylus">
     .shop-lists
       background-color white
       margin 1rem 0 1rem 0
       .item_img
         margin-bottom 1rem
       .goods_name
         color #000
         font-size 1.6rem
         line-height 2rem
         padding 1rem 1rem
       .shop-list-bottom
          display flex
          flex-direction row
          padding 1rem 1rem
          justify-content space-around
          align-items center
          .shop-list-bottom-left
             display flex
             flex-direction row
             align-items center
             .list-item-bottom-left-price
               font-size 2rem
               font-weight bolder
               color red
               margin-right 1rem
         .shop-list-bottom-right
             display flex
             flex-direction row
             justify-content center
             align-items center
             .shop-user
               display flex
               flex-direction row
               img
                 width 3rem
                 height 3rem
                 border-radius 50%
             .shop-btn
               width 8rem
               height 3rem
               background-color #e02e24
               border-radius 1rem
               margin-left 1rem
               color #fff
               font-size 1.6rem
               text-align center
               line-height 3rem
</style>

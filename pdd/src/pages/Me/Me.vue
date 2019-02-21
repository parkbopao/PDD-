<template>
   <div id="me" v-if="userInfo._id">
     <a href="javascript:;"  class="user"  >
       <img src="./images/me_icon.png" alt="">
       <p v-if="userInfo.phone">{{userInfo.phone | phoneFormat}}</p>
       <p v-else>{{userInfo.name}}</p>
       <i class="itlike-3"></i>
     </a>
     <div class="my-older">
       <div class="older-top">
         <h3>我的订单</h3>
         <span>查看全部 > </span>
       </div>
       <div class="older-bottom">
         <div class="bottom-item">
           <i class="itlike-1"></i>
           <span>待付款</span>
         </div>
         <div class="bottom-item">
           <i class="itlike-2"></i>
           <span>待分享</span>
         </div>
         <div class="bottom-item">
           <i class="itlike-3"></i>
           <span>待发货</span>
         </div>
         <div class="bottom-item">
           <i class="itlike-4"></i>
           <span>待收货</span>
         </div>
         <div class="bottom-item">
           <i class="itlike-5"></i>
           <span>待评价</span>
         </div>
       </div>
     </div>
     <div class="setting">
       <div class="setting-item">
         <i class="itlike-1"></i>
         <span>新人红包</span>
       </div>
       <div class="setting-item">
         <i class="itlike-2"></i>
         <span>多多果园</span>
       </div>
       <div class="setting-item">
         <i class="itlike-3"></i>
         <span>砍价免费拿</span>
       </div>
       <div class="setting-item">
         <i class="itlike-4"></i>
         <span>边逛边赚</span>
       </div>
       <div class="setting-item">
         <i class="itlike-5"></i>
         <span>天天领红包</span>
       </div>
       <div class="setting-item">
         <i class="itlike-uniE902"></i>
         <span>收货地址</span>
       </div>
       <div class="setting-item">
         <i class="itlike-1"></i>
         <span>我的评价</span>
       </div>
       <div class="setting-item">
         <i class="itlike-3"></i>
         <span>官方客服</span>
       </div>
       <div class="setting-item" @click.prevent="dealLogout()">
         <i class="itlike-4"></i>
         <span>退出</span>
       </div>
     </div>
   </div>
   <select-login v-else/>
</template>

<script>
  import SelectLogin from './../Login/SelectLogin'
  import {mapState} from  'vuex'
  import { MessageBox } from 'mint-ui'
  import {mapActions} from 'vuex'
    export default {
        name: "Me",
        components:{
           SelectLogin
        },
        computed:{
          ...mapState(['userInfo'])
        },
        filters:{
          phoneFormat(phone){
            let newPhone = '';
             phone = Array.prototype.slice.call(phone);
             phone.forEach((num,index)=>{
                if(index >=3 && index <=6){
                   newPhone += '*'
                }else {
                   newPhone += num
                }
             });
            return newPhone
          }
        },
       methods:{
         ...mapActions(['changeUserInfo']),
         dealLogout(){
           MessageBox.confirm('是否退出用户').then(action => {
              if(action === 'confirm'){
                  this.changeUserInfo()
              }
           });
         }
       }
    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  #me
    width 100%
    height 100%
    background-color #f5f5f5
    font-size 1.4rem
    .user
      display flex
      flex-direction row
      align-items center
      padding 2rem
      background-color #fff
      margin-bottom 1rem
      text-decoration none
      p
        margin 0 1rem
      img
        width 6rem
        height 6rem
        border-radius 50%
      i
        font-size 2.5rem
    .my-older
      background-color #fff
      .older-top
        display flex
        flex-direction row
        padding 0 1rem
        justify-content space-between
        height 4.4rem
        line-height 4.4rem
      .older-bottom
        display flex
        margin-bottom 1rem
        .bottom-item
          flex 1
          height 6rem
          display flex
          flex-direction column
          justify-content center
          align-items center
          padding-bottom 1rem
          i
            font-size 3rem
            color #E9232C
            margin-bottom 0.5rem
    .setting
      margin-top 1rem
      background-color #fff
      display flex
      justify-content space-between
      flex-wrap wrap
      .setting-item
        width 9rem
        height 7rem
        display flex
        flex-direction column
        justify-content center
        align-items center
        i
          font-size 2rem
          color orange
          margin-bottom 0.5rem
        span
          font-size 1.2rem
          color #000
</style>

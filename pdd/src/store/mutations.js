//引入mutation-types中的规则
import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  REC_SHOP_LIST,
  SEARCH_LIST,
  SYNC_USER_INFO,
  CLEAN_USER_INFO,
  ADD_GOODS_COUNT,
  REDUCE_GOODS_COUNT,
  SINGER_GOODS_SELECT,
  ALL_GOODS_SELECT,
  DEL_GOODS_SINGER
} from './mutation-types'
import Vue from 'vue'
export default {
  [HOME_CASUAL](state, {home_casual}) {
    state.homecasual = home_casual
  },
  [HOME_NAV](state, {home_nav}) {
    state.homenav = home_nav
  },
  [HOME_SHOP_LIST](state, {home_shop_list}) {
    state.homeshoplist = home_shop_list
  },
  [REC_SHOP_LIST](state, {rec_shop_list}) {
    state.recshoplist = state.recshoplist.concat(rec_shop_list);
  },
  [SEARCH_LIST](state,{search_list}){
     state.searchlist = search_list
  },
  [SYNC_USER_INFO](state,{userInfo}){
     state.userInfo = userInfo
  },
  [CLEAN_USER_INFO](state){
      state.userInfo = {}
  },
  [ADD_GOODS_COUNT](state,{goods}){
       if(goods.buy_count){
         goods.buy_count ++
       }
  },
  [REDUCE_GOODS_COUNT](state,{goods}){
      if(goods.buy_count){
        goods.buy_count -- ;
        if (0 === goods.buy_count){
          let index = state.cartGoods.indexOf(goods);
          state.cartGoods.splice(index,1)
        }
      }
  },
  [SINGER_GOODS_SELECT](state,{goods}){
      if(!goods.checked){//不存在该属性
          Vue.set(goods,'checked',true)
      }else {//存在改属性
          goods.checked = !goods.checked
      }
  },
  [ ALL_GOODS_SELECT ](state,{isSelect}){
      state.cartGoods.forEach((goods,index)=>{
          if(goods.checked){
             goods.checked = !isSelect
          }else {
             Vue.set(goods,'checked',!isSelect)
          }
      })
  },
  [DEL_GOODS_SINGER](state,{goods}){
       let index = state.cartGoods.indexOf(goods);
       state.cartGoods.splice(index,1)
  }
}


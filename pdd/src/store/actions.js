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
//引入各种数据接口
import {
  getHomeCasual,
  getHomeNav,
  getHomeShopList,
  getRecShopList,
  getSearchList,
  getUserInfo,
  quitUserInfo
} from './../api'

export default {
  //获取首页轮播图
  async reqHomeCasual({commit}, callback) {
    const result = await getHomeCasual();
    if (200 === result.success_code) {
      commit(HOME_CASUAL, {home_casual: result.message});
      //*必须在数据加载完后在进行轮播图的初始化
      //初始化轮播图的回调,也可以在页面的watch属性中利用this.$nextTick进行轮播的初始化
      callback && callback()
    }
  },
  //获取首页导航信息
  async reqHomeNav({commit}) {
    const result = await getHomeNav();
    if (200 === result.success_code) {
      commit(HOME_NAV, {home_nav: result.message});
    }
  },
  //获取首页商品列表信息
  async reqHomeShopList({commit}) {
    const result = await getHomeShopList();
    if (200 === result.success_code) {
      commit(HOME_SHOP_LIST, {home_shop_list: result.message});
    }
  },
  //获取推荐商品信息
  async reqRecShopList({commit},params){
     const result = await getRecShopList(params);
     setTimeout(()=>{
       let scb = params.scb;
       let ecb = params.ecb;
       if(true === result.success){
         commit(REC_SHOP_LIST,{rec_shop_list:result.data});
         scb && scb(result.data)
       }else {
         ecb && ecb('请求失败')
       }
     },2000)

  },
  //获取搜索的商品信息
  async reqSearchList({commit}){
    const result = await getSearchList();
    if(200 === result.success_code){
      commit(SEARCH_LIST,{search_list:result.message})
    }
  },
  //同步用户的信息
  syncUserInfo({commit},userInfo){
      commit(SYNC_USER_INFO,{userInfo})
  },
  //根据app页面的请求同步客户端用户信息
  async reqUserInfo({commit}){
     const result = await getUserInfo() ;
     if(200 === result.success_code){
         commit(SYNC_USER_INFO,{userInfo: result.data})
     }
  },
  // 清除本地用户信息,退出用户登录状态
  async changeUserInfo({commit}){
     const result = await quitUserInfo();
     if(200 === result.success_code){
        commit(CLEAN_USER_INFO)
     }
  },
  // 购物车单个商品的增加和减少
  updateGoodsCount({commit},{goods,isAdd}){
     if(isAdd){
        commit(ADD_GOODS_COUNT,{goods})
     }else {
       commit(REDUCE_GOODS_COUNT,{goods})
     }
  },
  // 购物车商品的选中和取消选中
   singerGoodsSelect({commit},{goods}){
      commit(SINGER_GOODS_SELECT,{goods})
   },
  // 购物车商品全部选中和取消全选
   allGoodsSelect({commit},{isSelect}){
       commit(ALL_GOODS_SELECT,{isSelect})
   },
  // 删除购物车的单个商品
   delGoodsSinger({commit},{goods}){
      commit(DEL_GOODS_SINGER , {goods})
   }
}


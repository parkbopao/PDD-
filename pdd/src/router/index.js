// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 2. 声明使用
Vue.use(VueRouter);
// 引入一级的路由版块
import Home from './../pages/Home/Home'
import Recommend from './../pages/Recommend/Recommend'
import Search from './../pages/Search/Search'
import Cart from './../pages/Cart/Cart'
import Me from './../pages/Me/Me'
import Login from './../pages/Login/Login'
// 引入二级的路由版块-home
import Hot from '../pages/Home/Children/Hot/Hot'
import Box from './../pages/Home/Children/Box'
import Dress from './../pages/Home/Children/Dress'
import Ele from './../pages/Home/Children/Ele'
import Food from './../pages/Home/Children/Food'
import General from './../pages/Home/Children/General'
import Man from './../pages/Home/Children/Man'
import Mbaby from './../pages/Home/Children/Mbaby'
import Shirt from './../pages/Home/Children/Shirt'
// 3. 输入路由对象
export default new VueRouter({
  routes: [
    {path:'/home',component:Home,
      meta:{showBottomTabBar:true},
      children:[
        {path:'hot',component:Hot,meta:{showBottomTabBar:true}},
        {path:'box',component:Box},
        {path:'dress',component:Dress},
        {path:'ele',component:Ele},
        {path:'food',component:Food},
        {path:'general',component:General},
        {path:'man',component:Man},
        {path:'mbaby',component:Mbaby},
        {path:'shirt',component:Shirt},
        {path:'/home',redirect:'/home/hot'},
      ]
    },
    {path:'/recommend',component:Recommend,meta:{showBottomTabBar:true}},
    {path:'/search',component:Search,meta:{showBottomTabBar:true}},
    {path:'/cart',component:Cart,meta:{showBottomTabBar:true}},
    {path:'/me',component:Me,meta:{showBottomTabBar:true}},
    {path:'/login',component:Login},
    {path:'/',redirect:'/home'}
  ]
});

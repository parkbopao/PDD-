import Vue from 'vue'
import App from './App'
// 引入路由对象
import router from './router/index'
// 引入vux实例对象Store
import store from './store'
import "common/stylus/mixins.styl"
//引入全局的字体图标样式
import './common/css/style.css'
//引入ly-tab第三方组件
import LyTab from 'ly-tab'
Vue.use(LyTab);
//引入vue-lazyload 和 加载的图片
import VueLozyLoad from 'vue-lazyload'
import loading from './common/img/loading.jpg'
Vue.use(VueLozyLoad,{
  loading
});
new Vue({
  el: '#app',
  store,
  router,
  render: h=>h(App)
});

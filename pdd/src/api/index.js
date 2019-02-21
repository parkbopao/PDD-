import ajax from './ajax'

//1.定义基础路径
const BASE_URL ='/local_api';
 // 设置代理服务器地址 app线上商城
const REC_BASE_URL = '/api';
//2. 定义请求的方法
//2.1 请求home/hot首页的轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');
// 2.2 请求home/hot首页的导航
export const getHomeNav = ()=> ajax(BASE_URL + '/api/homenav');
//2.3 请求home/hot 首页的商品列表
export const getHomeShopList = ()=> ajax(BASE_URL + '/api/homeshoplist');
//2.4 请求推荐界面数据
export const getRecShopList = (params) => ajax(REC_BASE_URL,params);
//2.5 获取搜索的商品信息
export const getSearchList = ()=> ajax(BASE_URL + '/api/search');
//2.6 请求生成验证码并且返回
export const getPhoneVerify = (phone) =>ajax(BASE_URL + '/api/send_code',{phone});
//2.7 请求手机验证码的登录
export const phoneCodeLogin = (phone,code) => ajax(BASE_URL + '/api/login_code',{phone,code},'POST');
//2.8 请求用户密码的登录
export const userLoginByCaptcha = (name ,pwd ,captcha) => ajax(BASE_URL + '/api/login_pwd',{name,pwd,captcha},'POST');
// 2.9 app页面发起的请求用户数据
export const getUserInfo = () => ajax(BASE_URL + '/api/userInfo');
// 2.10 请求退出用户登录  清除本地用户缓存
export const quitUserInfo = ()=> ajax(BASE_URL + '/api/quitUserInfo');

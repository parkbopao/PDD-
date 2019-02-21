<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt="" width="250">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current : loginMode}" @click="changeLoginMode(true)">短信登录</a>
          <a href="javascript:;"  :class="{current : !loginMode}" @click="changeLoginMode(false)">密码登录</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current:loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="user_phone">
              <button  class="get-verification " v-if="!countDown" :class="{phone_right:phoneRight}" @click.prevent="getPhoneVerifyCode()">获取验证码</button>
              <button disabled="disabled" class="get-verification" v-else>已发送({{countDown}}s)</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current:!loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="20" placeholder="密码" v-model="pwd" v-if="pwdMode">
                <input type="text" maxlength="20" placeholder="密码" v-model="pwd" v-else>
                <div class="switch-show">
                  <img  :class="{on:pwdMode}" @click.prevent="changePwdMode(false)" src="./images/hide_pwd.png" alt="" width="20">
                  <img  :class="{on:!pwdMode}" @click.prevent="changePwdMode(true)" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img
                  class="get-verification"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getLoginCaptcha"
                  ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">登录</button>
        </form>
        <button class="login-back" @click.prevent="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {getPhoneVerify,phoneCodeLogin,userLoginByCaptcha} from  './../../api/index'
  import {mapState} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
        name: "Login",
        data(){
           return {
              loginMode:true, //登录方式  true为手机验证码登录 false为账号密码登录
              user_phone:'' , //用户手机号
              code:'', //手机验证码
              user_name:'' ,//用户名
              pwd : '', //用户密码
              captcha : '',//图形验证码
              pwdMode : true ,// true密码隐码 false显码
              countDown:0 ,//验证码倒计时
              userInfo:{}
           }
        },
        computed:{
           //设置计算属性phoneRight判断输入的手机号是否正确
           phoneRight(){
             return /^1[34578]\d{9}$/.test(this.user_phone);
           },

        },
        methods:{
          ...mapActions(['syncUserInfo']),
          //处理登录的方式 true-手机验证码登录 false-用户名密码登录
             changeLoginMode(flag){
                this.loginMode = flag
             },
             //1.1发起获取手机验证码的方法,异步
             async getPhoneVerifyCode(){
                  //1.1.1验证手机号是否正确在发起请求
                  if(this.phoneRight){
                     //1.1.2 开启定时器,倒计时开始,初始化countDown的初始值为60s
                      this.countDown = 60 ;
                      this.setIntervalId = setInterval(()=>{
                          this.countDown -- ;
                          if( 0 === this.countDown){
                              clearInterval(this.setIntervalId)
                          }
                      },1000);
                      //1.1.3 请求服务器的生成手机验证码的方法-验证码保存在服务器端并且返回给客户端
                      const result = await getPhoneVerify(this.user_phone);
                      if(result.err_code === 0){
                        Toast({
                          message: result.message,
                          position: 'center',
                          duration: 3000
                        });
                         setTimeout(()=>{
                           clearInterval(this.setIntervalId);
                           this.countDown = 0
                         },3000);

                      }

                  }
             },
             // 处理隐码和显码
             changePwdMode(flag){
                   this.pwdMode = flag
             },
            //获取用户密码登录的图形验证码
              getLoginCaptcha(){
               //这里注意重定向304的问题,所以在后面添加随机时间
                   this.$refs.captcha.src = 'http://localhost:3000/api/captcha?time='+ new Date()
              },
              //2.发起登录
              async login(){
                 if(this.loginMode){
                    //2.1手机验证码登录
                      if(!this.user_phone){
                          Toast('手机号不能为空！');
                          return
                      }else if(!this.phoneRight){
                          Toast('请输入正确的手机号！');
                          return
                      }else if(!this.code){
                        Toast('验证码不能为空！');
                        return
                      }else if(!/^\d{6}$/gi.test(this.code)){
                        Toast('验证码格式问题！');
                        return
                      }
                      //接收服务端的结果,并将结果保留在客户端的userInfo中
                      const result = await phoneCodeLogin(this.user_phone,this.code) ;
                      console.log(result);
                      if(result.success_code === 200){
                          this.userInfo = result.data
                      }else {
                         this.userInfo = result.message
                      }
                 }
                 else {
                    //2.2 用户名密码登录
                    //注意这里因为要用到session对象的值，所以要进行代理,告诉服务器端这是同一个客户端发起的请求
                    if(!this.user_name){
                      Toast('用户名不能为空！');
                      return
                    }else if(!this.pwd){
                      Toast('密码不能为空！');
                      return
                    }else if(!this.captcha){
                      Toast('验证码不能为空！');
                      return
                    }
                   //接收服务端的结果,并将结果保留在客户端的userInfo中
                   const result = await userLoginByCaptcha(this.user_name,this.pwd,this.captcha);
                    //2.2.1判断是否有_id
                    if(result.success_code === 200){
                         this.userInfo = result.data
                    }else {
                         this.userInfo = {
                            message : '登录失败！'
                         }
                    }
                 }
                 console.log(this.userInfo);
                   //2.3判断当前页面的userInofo中是否有记录有_id属性的对象
                  if(!this.userInfo._id){
                     Toast(this.userInfo.message)
                  }else{
                    //请求成功 返回{success_code: 200,data: {_id: user._id,name: user.name,}以及时{success_code: 200,data: {_id: user._id,name: user.name,phone: user.phone}
                    //2.3.1 同步result.data的信息到客户端的userInfo中
                    this.syncUserInfo(this.userInfo);
                    //2.3.2 成功同步信息后返回主界面
                    this.$router.back()
                  }
              },

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .login-container
    width 100%
    height 100%
    background #fff
    .login-inner
      padding-top 60px
      width 80%
      margin 0 auto
      .login-header
        .login-logo
          font-size 40px
          font-weight bold
          color mediumpurple
          text-align center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.current
              color mediumpurple
              font-weight 700
              border-bottom 2px solid mediumpurple
      .login-content
        >form
          >div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid mediumpurple
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              input
                width 100%
                height 100%
                padding-left 8px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.phone_right
                  color purple
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
            .login-hint
              margin-top 12px
              color #999
              font-size 12px
              line-height 20px
              >a
                color mediumpurple
          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background mediumpurple
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid mediumpurple
          color mediumpurple
          text-align center
          font-size 16px
          line-height 42px
</style>

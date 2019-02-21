var express = require('express');
var router = express.Router();
var User = require('./../models/UserModel');
//引入svg-captcha的验证码文件
var svgCaptcha = require('svg-captcha');
//引入MD5
var md5 = require('blueimp-md5');
//引入通信短信接口
var sms_util = require('./../util/sms_util');
//定义一个全局的users用户
var users ={};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//获取home/hot页面轮播图
router.get('/api/homecasual',(req,res,next)=>{
    const data = require('./../data/homecasual');
    res.json(data)
});
//获取home/hot页面的nav
router.get('/api/homenav',(req,res,next)=>{
   const jsonNav = require('./../data/homenav');
   res.json({success_code:200, message:jsonNav.data})
});
//获取home/hot页面的shopList
router.get('/api/homeshoplist',(req,res,next)=>{
   const data = require('./../data/shopList');
   res.json({success_code:200 , message:data})
});
//获取search页面的商品分类列表
router.get('/api/search',(req,res,next)=>{
   const jsonSearch = require('./../data/search');
   res.json({success_code:200,message:jsonSearch.data})
});
/************个人中心*************/
/*****
 * 获取图形验证码
 */
router.get('/api/captcha', function (req, res) {
    // 1.初始化生成随机的验证码
    var captcha = svgCaptcha.create({
        color:true,
        noise:2, //干扰线长度
        size:4, //验证码长度
        ignoreChars:'0oli' , //验证码字符中排除 0oli
    });
    // 2.保存验证码到session
    req.session.captcha = captcha.text.toLocaleLowerCase();
   // 3. 返回给客户端
    res.type('svg');
    res.status(200).send(captcha.data);
});
/****
 * 用户名和密码登录  验证验证码正确性
 */
router.post('/api/login_pwd',(req,res)=>{
   // 1.获取数据
   var name = req.body.name;
   var pwd = md5(req.body.pwd);
   var captcha = req.body.captcha.toLocaleLowerCase();
    // console.log('/api/login_pwd', name, pwd, captcha, req.session);
    //合法验证  -验证验证码正确性  如果错误返回结束
    if(captcha !== req.session.captcha){
         return res.send({err_code:0 , message : '验证码不正确'})
    }
    // 3.如果成功从session中删除验证码
    delete req.session.captcha ;
    //查询数据库
    User.findOne({name},(err,user)=>{
        //console.log(user);
        if(user){
             if(user.pwd !== pwd){
                 return res.send({err_code: 0,message:'用户名或密码不正确！'})
             }else {
                 req.session.userid = user._id;
                 res.send({
                     success_code: 200,
                     data: {
                         _id: user._id,
                         name: user.name,
                     }
                 });
             }
        } else if(!user){
             var userModel = new User({
                 name,
                 pwd,
             });
             userModel.save((err,user)=>{
                 req.session.userid = user._id;
                 res.send({
                     success_code: 200,
                     data: {
                         _id: user._id,
                         name: user.name
                     }
                 })
             })
        }
    })

});
/***
 * 获取手机短信验证 code
 */
router.get('/api/send_code',(req,res)=>{
    // 1.获取手机号
      var phone = req.query.phone ;
      // 2.随机产生验证码
      var code = sms_util.randomCode(6);
    /*
 sms_util.sendCode(phone, code, function (success) {
     if(success){ // 验证码已经成功发送到手机
         users[phone] = code;
         res.send({success_code: 200, message: '验证码获取成功!'});
     }else { // 验证码获取失败
         res.send({err_code: 0, message: '验证码获取失败!'});
     }
 });
 */
    //这里需要定义一个全局的user对象 用来存放手机号用户  { phone ： code}
    setTimeout(()=>{
        users[phone] = code ;
        console.log(users);
        res.send({success_code: 200, message: '验证码获取成功!', code});
    },3000);
    // 4. 失败
   /*  setTimeout(()=>{
         res.send({err_code: 0, message: '验证码获取失败!'});
     }, 2000);*/

});
/***
 * 手机短信验证码登录
 */
router.post('/api/login_code',(req,res)=>{
   // 1.获取数据
   const phone = req.body.phone ;
   const code = req.body.code ;
   //2.判断验证码是否正确
    if(users[phone] !== code){
        return res.json({error_code: 0, message: '手机或验证码不正确!'})
    }
    //删除保存的验证码
    delete users[phone];
    console.log(users);
    User.findOne({phone},(err,user)=>{
        if(user){
             req.session.userid = user._id;
             res.send({
                success_code: 200,
                data: {
                    _id: user._id,
                    name: user.name,
                    phone: user.phone
                }
            });
        }else {
            //用户不存在
            var userModel = new User({phone});
            userModel.save((err,user)=>{
                req.session.userid = user._id;
                res.send({
                    success_code: 200,
                    data: {
                        _id: user._id,
                        name: user.name,
                        phone: user.phone
                    }
                });
            })
        }
    })
});

/****
 * 根据session中的userId,去查询数据库中对应的用户返回给客户端
 */
// 写一个filter过滤掉数据库中的某些字段
const filter = { pwd:0 , l_time:0 , __v:0};
router.get('/api/userInfo',(req,res)=>{
   //取出session中的userId
    const userId = req.session.userid ;
    //根据userId去数据库中查找
    User.findOne({_id:userId},filter,(err,user)=>{
        if(!user){
            //清除上一次的userid
            delete req.session.userid;
            res.send({err_code:0 , message:'请先登录'})
        }else {
            res.send({success_code:200 , data:user })
        }
    })

});
/****
 * 退出用户
 */
router.get('/api/quitUserInfo',(req,res)=>{
    //删除服务器端userid
    delete req.session.userid ;
    res.send({success_code:200 , message : '用户退出成功'})
});
/************个人中心*************/
module.exports = router;

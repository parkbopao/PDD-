var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lk_pdd');
mongoose.connection.once('open',()=>{
   console.log('数据库连接成功')
});
//Schema模块对象
//var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
   //用户名
   name: {type:String},
   //密码
   pwd : {type : String},
   //手机
   phone:{type : String},
   //最后操作的时间
   l_time:{type : Date , default:Date.now}
});

//输出文档(model)
var User = mongoose.model('user',userSchema);
module.exports = User;

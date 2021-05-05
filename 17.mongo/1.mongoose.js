const mongoose = require('mongoose'); 
// 连接数据库
mongoose.connect(`mongodb://webAdmin:1234qwer@127.0.0.1:27017/web`, {useNewUrlParser: true, useUnifiedTopology: true}, function (err){
  /* 
  (node:13912) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
  (node:13912) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
  */
  if(err) {
    return console.log('数据库连接失败')
  }
  console.log('数据库连接成功')
});

/**
 * 数据库连接成功后 https://mongoosejs.com/  https://typeorm.biunav.com/zh/
 *  1.给数据库创建一个固定的骨架，用来描述集合中的字段，规范存入的数据格式，使其更像关系型数据库 
 *  2.创建一个数据库的模型来操作数据库
 */

// 1
const UserSchema = mongoose.Schema({
  name:{  // vue-> props校验
    type:String,
    trim:true, // 表示去掉前后空格
    lowercase:true,
    required:true
  },
  password:{
    type:String, // 当保存密码的时候
    required:true,
    validate:{
        validator(value){ // 返回true表示校验通过
            return true
        }
    },
    maxlength:100,
    minlength:0
  },
  age:{
    type:Number,
    default:6,
    min:0,
    max:120
  },
  gender:{
    type:Number,
    enum:[0,1]
  },
});

// 2
const UserModel = mongoose.model("User", UserSchema, 'user');

(async () => {
  let r = await UserModel.create({
    name: "哈哈",
    password: "1234",
    age: 10,
    gender: 0
  })
  console.log(r);
  mongoose.disconnect();
})();

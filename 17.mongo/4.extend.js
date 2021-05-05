const ActicleModel = require('./model/article');
const UserModel = require('./model/user')
const mongoose = require('mongoose');

(async () => {
  // 使用静态方法
  // let res = await UserModel.findByName('abc0');
  // 使用实例方法
  // let res = await new UserModel({name:'zs1',password:'ls', age:19, gender:0}).saveMd5();
  // 虚拟属性
  let res = await UserModel.findOne({});
  console.log(res.usernameAndPassword);
  mongoose.disconnect()
})()
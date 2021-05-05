const mongoose = require('./index.js');
const crpto = require('crypto');
const UserSchema = new mongoose.Schema({
  name:String,
  password:String,
  age:Number,
  gender:Number
},{
  timestamps:{
    createAt:'createAt',
    updateAt:'updateAt'
  }
});

// 自定义一个静态方法
UserSchema.statics.findByName = function (name) {
  return this.findOne({name: name})
};

// 定义一个实例方法
UserSchema.methods.saveMd5 = function() {
  // console.log(this)
  this.password = crpto.createHash('md5').update(this.password).digest('base64');
  // 获取模型
  this.save(); // 直接修改后将自己保存 ， 通过找到文档在保存自己
  // return this.model('User').create(this)
  return true
}

UserSchema.virtual('usernameAndPassword').get(function() {
  return this.name + '+' + this.password
})
module.exports = mongoose.model("User", UserSchema, "user");
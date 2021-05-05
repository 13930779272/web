const UserModel = require('./model/user');
const mongoose = require('mongoose');
let arr = []
for(let i = 0;i < 10;i++){
  arr.push({
    name: 'abc' + i,
    password: 'qwe' + i,
    age: i,
    gender: 0
  });
};
(async () => {
  // let res = await UserModel.create(arr);
  // console.log(res);
  // 数据库条件查询：单个查询、或、与、范围
  // await UserModel.find({}):查询所有，第一个对象参数为查询条件，第二个对象参数为需要显示的字段 1代表我需要显示其他的需要隐藏，0代表我需要隐藏其他的字段需要显示，所以不要既有1又有0 id除外。 findById：查询一个
  // console.log(await UserModel.find({name: 'abc9', password: 'qwe9'},{age:1, gender:1}))

  // 或的情况 $or：或 操作运算符
  // console.log(await UserModel.find({
  //   $or:[{name:'abc1'},{name: 'abc5'}]
  // },{_id:0}))

  // $gt: 大于，$lt:小于 $in
  // console.log(await UserModel.find({
  //   age:{$gt:4}
  // },{_id:0}));

  // 高级查询分页
  // console.log(await UserModel.find({}).skip((2-1) * 3).limit(3).sort({age: -1}))

  // 删除
  // console.log(await UserModel.deleteOne({name:"456"}))

  // 更新一个 把name=xxx的修改为name=123，如果找不到这个数据就插入一条
  // console.log(await UserModel.updateOne({name:"xxx"},{name:"123"},{upsert: true}));
  // console.log(await UserModel.updateOne({name:"哈哈"},{name:"456"},{upsert: true}));

  // 更新多个
  await UserModel.updateMany({age: {$gt: -1}},{upsert: true})
  mongoose.disconnect();
})();

const ActicleModel = require('./model/article');
const UserModel = require('./model/user')
const mongoose = require('mongoose');


(async () => {
  // 写一篇文章并上传
  // let user = await UserModel.create({
  //   name: "zuozhe1",
  //   password: "zuozhe1",
  //   age: 25,
  //   gender: 0
  // });
  // await ActicleModel.create({title:"写作测试",content:"写作测试", user_id: user._id});

  // 通过文章的用户Id找到用户，1.聚合功能，2.聚合管道
  // let r = await ActicleModel.findById('608e7fa9cca6e44a90d31db5').populate("user_id")

  let r = await ActicleModel.aggregate([
    {
      $lookup: {
        from: 'user',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId('608e7fa9cca6e44a90d31db5')
      }
    },
    {
      $project:{ // 查询的数据只显示文章对应的user字段
        user: 1,
        // _id:0
      }
    },
    // {
    //   $group:{ // mysql 分组 学生-> 考试 对他们的科目分组 并且就平均分 总分....

    //   }
    // }
  ])
  console.log(JSON.stringify(r)) // [{"_id":"608e7fa9cca6e44a90d31db5","title":"写作测试","content":"写作测试","user_id":"608e7fa9cca6e44a90d31db4","createTime":"2021-05-02T10:32:09.119Z","__v":0,"user":[{"_id":"608e7fa9cca6e44a90d31db4","name":"zuozhe1","password":"zuozhe1","age":25,"gender":0,"createdAt":"2021-05-02T10:32:09.087Z","updatedAt":"2021-05-02T10:32:09.087Z","__v":0}]}]
  mongoose.disconnect()
})()
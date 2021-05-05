const mongoose = require('./index');
const ActicleSchema = new mongoose.Schema({
  title:String,
  content:String,
  createTime:{
    type: Date,
    default: Date.now
  },
  // 文章的特殊id用户的_id
  // user_id: mongoose.SchemaTypes.ObjectId

  // 聚合功能
  // user_id: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "User"
  // }

  // 管道
  user_id: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model("ActicleSchema", ActicleSchema, "acticleschema")
const mongoose = require('mongoose');
mongoose.connect(`mongodb://webAdmin:1234qwer@127.0.0.1/web`,{useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err) return console.log('数据库连接失败' + err);
  return console.log('数据库连接成功')
});

module.exports = mongoose;
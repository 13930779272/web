const fs = require('fs');
const path = require('path')

let readStream = fs.createReadStream(path.resolve(__dirname, 'a.txt'), {
  flags: 'r', // 操作符
  encoding: null, // 默认就是buffer
  autoClose: true, // 是否自动关闭
  emitClose: false, // 是否可以手动关闭
  start: 0, // 开始位置
  // end: null, // 结束位置，默认infinity
  highWaterMark: 3 // 每次读取的个数
});
readStream.on('open', function (fd) {
  console.log(fd);
});
readStream.on('data', function (chunk) {
  // chunk: 每次读到的数据
  console.log(chunk);
  // 每读取一次就暂停
  readStream.pause();
});
// 读取结束之后关闭
readStream.on('close',function() {
  console.log('close')
});
// 读取结束了触发
readStream.on('end', function() {
  console.log('end')
});
// 定时器
setInterval(() => {
  // 启动读取
  readStream.resume();
}, 1000)

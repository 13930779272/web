const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream.js');
/**
 * 可读流 readStream
 *  不是一下子把文件都读取完毕，而是可以控制读取的个数和读取的速率
 *  是fs模块下一个基于stream扩展的一个方法。
 *  流的概念跟fs模块并没有实际的关系
 */

// let readStream = fs.ReadStream(path.resolve(__dirname, 'a.txt'), {
let readStream = new ReadStream(path.resolve(__dirname, 'a.txt'), {
  flags: 'r', // 操作符
  encoding: null, // 默认就是buffer
  autoClose: true, // 是否自动关闭
  emitClose: false, // 是否可以手动关闭
  start: 0, // 开始位置
  end: 4, // 结束位置，默认infinity, 包后的 0-1是读取两个
  highWaterMark: 3 // 每次读取的个数
});
// 读取文件之前必须先把文件打开
readStream.on('open', function (fd) {
  console.log(fd, '2222');
});
// 读取数据过程中触发
readStream.on('data', function (chunk) {
  // chunk: 每次读到的数据
  console.log(chunk);
  // 每读取一次就暂停
  // readStream.pause();
});
// 读取结束之后关闭文件
readStream.on('close',function() {
  console.log('close');
});
// 读取结束了触发
readStream.on('end', function() {
  console.log('end');
});
readStream.on('error', function(err) {
  console.log(err, '1111');
})
// 定时器
// setInterval(() => {
//   // 启动读取
//   readStream.resume();
// }, 1000)


// open 和 close 是文件流独有的
// 可读流都具备: on('data')、on('end')、on('error')、resume、pause
const path = require('path');
const fs = require('fs');
// 
/**
 * i/o input/output  对于内存而言读文件是读磁盘写内存，写文件是读内存写磁盘
 * readFile 读取文件的时候如果不传编码类型默认是buffer
 * writeFile 写文件的时候不传编码类型默认是转换成utf8编码写入
 * readFile和writeFile 嵌套的方法只能读取完成之后在写入， 大文件使用此方法会淹没内存，假如有8个g的数据读写的话会占用8个g内存，此方式适合小的文件
 * 读一点写一点才是我们想要的结果
 */
fs.readFile(path.resolve(__dirname, '1.buffer.js'),function(err, data){
  if(err) return console.log(err);
  console.log(data);
  // 此时写入的数据为 [object Object] 因为默认toString()了
  // fs.writeFile(path.resolve(__dirname, 'test_encoding.js'), {qweqw:5}, function(err, data) {
  //   console.log(data)
  // })
  // fs.writeFile(path.resolve(__dirname, 'text.js'), data, function(err, data) {
  //   console.log(data)
  // })
});

/**
 * 读一点写一点的api是 fs.read fs.write fs.open 很少用，pipe的原理是这个
 */
// 创建一个三个字节的buffer
let buffer = Buffer.alloc(3);
// 打开需要读取的文件的绝对地址，r读取操作符， 回调
fs.open(path.resolve(__dirname, 'a.txt'), 'r', function(err, fd) {
  // console.log(fd);
  // fd 缓存区buffer， 缓存区写入的偏移量， 写入的长度， 读取文件的偏移量，
  fs.read(fd, buffer, 0, 3, 7, function (err,bytesRead, readBuffer) {
    console.log(bytesRead, readBuffer); // 3 <Buffer 37 38 39>
    fs.open(path.resolve(__dirname, 'b.txt'), 'w', function (err, wfd) {
      fs.write(wfd, buffer, 0, 3, 0, function(err, written, writeBuffer) {
        console.log(written, writeBuffer) // 3 <Buffer 36 37 38>
        // 关闭打开的两个文件
        fs.close(fd, ()=>{});
        fs.close(wfd, ()=>{});
      })
    })
  })
})

// console.log(Buffer.from([0xe5, 0x88, 0x98, 0xe6, 0x9c]).toString())
// console.log(function(){}.toString('utf8'))
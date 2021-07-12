const fs = require('fs');
const path = require('path');

/**
 * fs.readFile/fs.readFilesync/fs.writeFile/fs.writeFileSync:去做文件读写的功能小文件还可以，但是去读写大文件，会导致内存淹没，假如读写一个8G的文件的话就会导致占用8G的缓存
 * 我们需要去实现一个读一点就写一点的操作，就是流（stream）流的内部主要就是fs.open/fs.read/fs.write/fs.close 等api实现的
 */

function copy(source, target, cb) {
  let buf_size = 3;
  let buffer = Buffer.alloc(buf_size);
  let readOffset = 0;
  let writeOffset = 0;
  // 读取一部分数据 就 写入一部分数据
  // w 写入操作 r  读取操作 a 追加操作 r+ 以读取为准可以写入操作  w+ 以写入为准可以执行读取操作
  // 权限  3组 rwx组合  421 = 777(八进制 )  （当前用户的权限 用户所在的组的权限 其他人权限  ）
  // 0o666 = 438
  // exe 文件 bat 文件能执行的文件  
  // 读取的文件必须要存在，否则会报异常，读取出来的结果都是buffer类型
  // 写入文件的时候文件不存在会创建，如果文件有内容会被清空
  fs.open(path.resolve(__dirname, source), 'r', function (err, rfd) {
    fs.open(path.resolve(__dirname, target), 'w', function (err, wfd) {
      function next() {
        fs.read(rfd, buffer, 0, buf_size, readOffset, function (err, bytesRead, readBuffer) {
          if (err) return cb(err)
          if (bytesRead) {
            fs.write(wfd, buffer, 0, bytesRead, writeOffset, function (err, written, writeBuffer) {
              if (err) return cb(err);
              readOffset += bytesRead;
              writeOffset += written;
              next()
            });
          } else {
            fs.close(rfd, () => {});
            fs.close(wfd, () => {});
            cb()
          }
        })
      };
      // 先调用一次
      next()
    })
  })
};
// 初步实现了读三个写三个但是想要全部读写完成，还得靠递归， 因为是异步的，如果是同步的可以用while循环，但是这样的代码太不优雅了，想要读写解耦还得用发布订阅
copy('a.txt', 'b.txt', (err) => {
  if (err) return console.log(err)
  console.log('copy success')
});
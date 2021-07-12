const fs = require('fs');
const EventEmitter = require('events');
const path = require('path')

class ReadStream extends EventEmitter{
  constructor(path, options = {}) {
    super();
    this.path = path;
    this.flages = options.flags || 'r';
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.flowing = false;
    // 先打开文件
    this.open();
    // 然后去读取文件，此时注意只有用户绑定了data事件才会去触发读取文件的操作，newListeber 订阅一个事件触发一次这个函数
    this.on('newListener', function(type) {
      console.log(type);
      if(type === 'data') {
        this.flowing = true
        this.read()
      }
    });
    this.offset = this.start
  }
  destory(err) {
    if(err){
      this.emit('error', err);
    }
    if(this.autoClose) {
      this.emit('close')
    }
  }
  open(){
    fs.open(this.path, this.flages, (err, fd) => {
      if(err) {
        return this.destory(err)
      };
      this.fd = fd;
      this.emit('open', fd)
    })
  }
  read() {
    // 因为open文件是异步操作，所以此时直接在这拿需要的fd，是拿不到的
    // console.log(this.fd,'1111')
    if(typeof this.fd !== 'number'){
      // 在内部绑定一次open事件当文件打开完成之后会触发第一次open事件，再次触发读取文件
      return this.once('open',() => this.read())
    };
    // 
    
    // 判断是否有设置了需要结束的位置，如果有就计算真实可以读取的个数跟想要每次读取的个数取小值，如果没有end及时读取到最后（包前也包后）
    let length = this.end ? Math.min(this.end - this.offset + 1, this.highWaterMark) : this.highWaterMark;
    // 创建一个内存
    this.buffer = Buffer.alloc(length);
    console.log(length)
    fs.read(this.fd, this.buffer, 0, length, this.offset, (err, bytesRead, buffer) => {
      // 判断报错
      if(err) {
        return this.destory(err);
      }
      // 判断是否读取到了数据
      if(bytesRead) {
        console.log(bytesRead, '1111')
        // 改变偏移量
        this.offset += bytesRead
        // 把数据返回,数据有可能读不到我们想要的个数，所以要截取下真正读取的数据
        // this.emit('data', buffer.slice(0,bytesRead));
        // 因为每次需要读取多少个我已经知道了，就不用截取了
        this.emit('data', buffer);
        // 继续读取下一轮
        if(this.flowing){
          this.read()
        }
      } else { // 如果没有读取到数据就证明读取结束了
        this.emit('end');
        this.destory()
      }
      
    })
  }
  // 直接暂停
  pause() {
    this.flowing = false;
  }
  resume(){
    if(!this.flowing){
        this.flowing = true;
        this.read();
    }
}
}

module.exports = ReadStream
// activity_id_192595_playing_counter 1
// durations ["1434-13532:135"]
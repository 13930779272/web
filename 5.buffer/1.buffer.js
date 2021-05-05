/** buffer
 * 在es6之前前端是无法直接读取文件、操作文件的（es6出现了fileReader）
 * node是使用在服务端的，对文件和前端传递的数据（二进制数据）进行处理的
 * 所有的数据都是以二进制来进行存储的，都是以二进制数据来表现的
 * 因为所有的数据都是以二进制来存储的所以会有不精准的情况
 * 
 * 计算机中以字节为最小单位来存储数据的，实际上最小的单位为 “位 bit” (https://baike.baidu.com/item/%E6%AF%94%E7%89%B9%28bit%29/7675114?fr=aladdin)
 * 
 * buffer是表示内存的是一段固定的空间，产生的内存是固定大小的不能随意添加
 * 扩容的概念，需要动态创建一个新的内存，把内容迁移过去
 * 
 * npm install @types/node 可以支持node提示 (仅仅是安装了ts的提示而已，为了方便)
 * 
 */


0.1 + 0.2 === 0.3 // false
0.1 + 0.2 // 0.30000000000000004
// 进制转换问题


/**
 * 进制转换整数
 *  十进制整数x转换成y进制数：x/y 取余倒着读
 *  x进制整数2222转换成十进制：2*x^0 + 2*x^1 + 2*x^2 + 2*x^3、
 * 进制转换小数
 *  十进制小数转换为x进制数：乘2取整法
 *  二进制小数转换成十进制
 * 方法：
 *  parseInt('10101011', 2)： 将2进制的10101011转换成十进制数，
 *  (0x64).toString():将16进制的64转换成十进制数，0x代表16进制 0b代表二进制 0o代表8进制
 *  (0b11111111).toString(16)：将二进制数11111111转换成16进制数
 * parseInt转换出来为数字类型，toString转换出来为字符串类型
 */
console.log(parseInt('11111111', 2)) // 255

// 0b:二进制 0x：十六进制
// console.log((0x64).toString())
console.log((0b11111111).toString(16))
console.log((255).toString(16));

/**
 * 在服务端我们需要一个东西来表示内存，但是不能是字符串,字符串无法表示图片
 * node中buffer来表示内存的数据，把内容转换成了16进制来显示，16进制比较短
 * 16进制： 0 1 2 3 4 5 6 7 8 9 a b c d e f
 * 
 * node中的buffer可以和字符串任意转换但是可能会出现乱码（图片就出现乱码）
 */

/**
 * 编码规范
 *  ASCII -> GB18030/GBK -> unicode -> utf8/16
 *  ASCII:码是美国搞的所以只要127个就把所有的表示完了（单字节 字母、符号等都是一个字节）（https://baike.baidu.com/item/ASCII/309296?fr=aladdin）
 *  但是要想把所有中文的文字符号都表示出来单字节是远远不够的，所以要用双字节来表示共能表示（255 * 255）个
 *  中国为了能表示自己出来了GB2312/GB18030/GBK
 *  unicode 想要统一所有编码但是没有实现统一，只有一个规范：可变字节长度
 *  最后由utf组织解决了，在utf8中一个汉字由三个字节组成,字符为一个字节
 * 
 * node只支持utf8，不支持gbk
 */

/**
 * buffer:
 *  根据长度来声明
 *   Buffer.alloc(5) => <Buffer 00 00 00 00 00> 类似数组但是不能扩展，可以用索引取值，取出来的内容为十进制的
 *  根据内容声明(用的非常少)
 *   Buffer.from([100, 200, 212]) => <Buffer 64 c8 d4>
 *   Buffer.from('刘月鹏') => <Buffer e5 88 98 e6 9c 88 e9 b9 8f> (用的相对多)
 * 
 * 一般情况下，我们会alloc来声明一个buffer，或者把字符串转换成buffer使用
 * 后台获取的数据都是buffer，包括后面的文件操作也都是buffer形式
 * 
 * 
 */
const buffer = Buffer.alloc(5);
console.log(buffer); // <Buffer 00 00 00 00 00>

const buffer1 = Buffer.from([100, 200, 212]); // 不能超过255，超过取余
console.log(buffer1); // <Buffer 64 c8 d4>

const buffer2 = Buffer.from('刘月鹏');
console.log(buffer2); // <Buffer e5 88 98 e6 9c 88 e9 b9 8f> 九个字节


/**
 * base64：没有加密功能，只是一个编码的规范，所有人都知道
 * MD5（消息摘要算法https://baike.baidu.com/item/MD5/212708?fr=aladdin）不是加密算法，不能解密，可以撞库
 * 加密算法：加密算法是可逆的，既能加密也能解密
 * 
 * base64（https://baike.baidu.com/item/base64/8545775?fr=aladdin）: Base64编码是从二进制到字符的过程，字符串可以放到任何的代码里减少请求的次数，但是通过base64编码会文件的大小变大三分之一
 * 因为base64是将每个字节都转换成小于64的
 * 文件过大时base64会有问题，缓存也无法做了，因为浏览器的缓存是基于文件的，如果是base64就无法缓存了，
 * base64会使请求的文件变大
 */
const buffer3 = Buffer.from('刘').toString('base64'); // toString: 放的是buffer编码，转换成指定的编码（base64/utf8）
const buffer4 = Buffer.from('刘');
console.log(buffer3, buffer4); // base6: 5YiY 四个字节 正常的buffer: <Buffer e5 88 98> 三个字节

// base64转换流程解析, 
console.log(0xe5.toString(2)) // 11100101
console.log(0x88.toString(2)) // 10001000
console.log(0x98.toString(2)) // 10011000

// 二进制6个 111111 最大就是63 不超过64
console.log(0b111111.toString(10)) // 63
// 所以要把3 * 8字节的格式转换成 6 * 4 的，这样的话就多了一个字节
// 11100101 10001000 10011000   8 * 3 3个字节
// 111001 011000 100010 011000  6 * 4 四个字节

console.log(parseInt('111001', 2)) // 57
console.log(parseInt('011000', 2)) // 24
console.log(parseInt('100010', 2)) // 34
console.log(parseInt('011000', 2)) // 24

// 0-63 取值范围是 64， 找到上面四个值，然后去base64编码规范里找到对应的字符就是64编码的了

// base64 编码表
let base64str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
base64str += base64str.toLocaleLowerCase();
base64str += '0123456789+/';

console.log(base64str[57] + base64str[24] + base64str[34] + base64str[24]) // 5YiY 跟上面的对上了



/**
 * buffer:
 *  alloc: 根据字节数声明buffer
 *  from: 根据内容声明buffer
 *  slice: 截取buffer
 *  copy: 拷贝到另一个buffer上（一般用不到concat是基于buffer）
 *  concat: 拷贝Buffer.concat([buffer1, ...], 5); 第一个参数是需要concat的buffer组成的数组，第二个参数代表拷贝几个字节，拼不成汉字会出乱码，超出了总长度会补零
 *  indexOf: 
 *  isBuffer: 判断是不是一个buffer
 *  Buffer.length: buffer长度
 *  Buffer.byteLength: 跟长度一样,只要是utf8编码汉字的长度是3字符的长度是1
 *  buffer.toString(): 第一个参数要使用的字符编码默认utf8 (https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html#buffer_buf_tostring_encoding_start_end)
 */

const buffer5 = Buffer.from([1, 2, 3, 4, 5]);
const buffer6 = buffer5.slice(0,1);
buffer6[0] = 100; // 此处操作之后俩个buffer都会变化，因为内部存的引用地址，数组就不会这样
console.log(buffer5, buffer6);

// 二维的数组的slice就跟buffer类似
let arr = [[1], 2, 3, 4];
let newArr = arr.slice(0,1);
newArr[0][0] = 100;
console.log(arr, newArr);

// copy
// Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
//   for (let i = sourceStart; i < sourceEnd; i++) {
//       targetBuffer[targetStart++] = this[i];
//   }
// }
let buffer7 = Buffer.from('刘');
let buffer8 = Buffer.from('月');
let buffer9 = Buffer.from('鹏');
let bigBuffer = Buffer.alloc(9);
buffer7.copy(bigBuffer, 0, 0, 3);
buffer8.copy(bigBuffer, 3, 0, 3);
buffer9.copy(bigBuffer, 6, 0, 3);
console.log(bigBuffer.toString()) // 刘月鹏


// concat
// Buffer.concat = function(bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
//   let bigBuffer = Buffer.alloc(length);
//   let offset = 0;
//   bufferList.forEach(buf=>{
//       buf.copy(bigBuffer,offset)
//       offset += buf.length
//   })
//   return bigBuffer
// }
console.log(Buffer.concat([buffer7, buffer8, buffer9], 6).toString()) //刘月


/**
 * http是分包传递的，把每段数据进行拼接
 */



const EventEmitter = require('./events');
const util = require('util');
// console.log(EventEmitter)

/**
 * 发布订阅模式：redux vue express koa webpack
 *  订阅一次
 *  订阅方法
 *  发布方法
 *  取消订阅
 */

function Fn() {

}

util.inherits(Fn, EventEmitter);
let fn = new Fn();

const push = () => {
  console.log('push')
}

const push2 = () => {
  console.log('push2')
}

fn.on('push', push);

fn.on('push', () => {
  console.log('push1')
});

fn.once('push', push2)
fn.off('push', push2)
setTimeout(() => {
  fn.emit('push');
  // 解绑push
  fn.off('push', push);
  fn.emit('push');
}, 1000)



// Fn.prototype = EventEmitter.prototype; // 这样继承是不行的,同一个地址
// Fn.prototype.__proto__ = EventEmitter.prototype; // 链式继承，等同于 Object.setPrototypeOf(需要继承的原型, 被继承的原型);
// Object.setPrototypeOf(Fn.prototype, EventEmitter.prototype);

// Fn.prototype = Object.create(EventEmitter.prototype)

// function create(proto) {
//   function Fn();
//   Fn.prototype = proto;
//   return new Fn()
// }
const obj = {
  name: 'hahah',
  age: 18,
  info: {
    address: 'beijing'
  }
}

const {name, age, info: { address }} = obj;

// 解构赋值
console.log(name, age, address);


// 非解构赋值
console.log(obj.name, obj.age, obj.info.address);

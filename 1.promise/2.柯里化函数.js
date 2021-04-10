// 面试题实现curring达到效果
function sum(a, b, c, d) { // 我要记录每次调用时传入的参数，并且和函数的参数个数进行比较，如果不满足总个数 就返回新函数， 如果传入的个数和参数一致  执行原来的函数
  return a + b + c + d
}

function curring (cb) {
  let inner = (arg = []) => {
    return arg.length >= cb.length ? cb(...arg) : (...args) => inner([...arg, ...args])
  }
  return inner()
}

let sum1 = curring(sum)
// let sum2 = sum1(1)(2)(3)(4)
// let sum3 = sum2(2, 3)
// let result = sum3(4);
// console.log(sum2)


// 数据类型检测
function isType (type, data) {
  return Object.prototype.toString.call(data) === `[object ${type}]`
}

function fn (cb) {
  let inner = (ary = []) => {
    return ary.length === cb.length ? cb(...ary) : (...params) => inner([...ary, ...params])
  }
  return inner()
}

let util = {};

['Number', 'String', 'Object', 'Function', 'Null', 'Undefined', 'Array', 'Boolean'].forEach(item => {
  util['is' + item] = fn(isType)(item)
})

console.log(util)
console.log(util.isNumber(123))
console.log(util.isBoolean(true))
// fn(isType)
// console.log(isType(123, 'Number'))
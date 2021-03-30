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
let sum2 = sum1(1)(2)(3)(4)
// let sum3 = sum2(2, 3)
// let result = sum3(4);
console.log(sum2)

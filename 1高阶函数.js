// 高阶函数：一个函数返回一个函数或者一个函数的参数是一个函数

// 给一个函数扩展一个方法，并且不影响函数本身的核心逻辑
function fn(...args) {
  // ……
  console.log('函数本身的核心逻辑', args);
  // ……
};
// 我们给每个函数都扩展方法
Function.prototype.extendFn = function (cb) {
  return (...args) => {
    cb();
    this(...args);
  };
};

let extend = fn.extendFn(() => {
  console.log('我们自己扩展的方法');
});

extend(1,2);

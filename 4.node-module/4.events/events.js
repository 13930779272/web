function EventEmitter() {
  this._events = {},
  this.a = 100
};

EventEmitter.prototype.on = function (eventName, cb) {
  // console.log(eventName, this.a, 1111)
  // 此时的this是Fn是继承的那个函数，所以可能没有_events,没有就加一个
  if (!this._events) {
    this._events = {}
  }
  if (this._events[eventName]) {
    this._events[eventName].push(cb)
  } else {
    this._events[eventName] = [cb]
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  this._events[eventName].forEach(fn => {
    fn(...args)
  });
}

EventEmitter.prototype.off = function(eventName, cb) {
  if(this._events && this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => fn !== cb && fn.l !== cb);
  }
}

EventEmitter.prototype.once = function (eventName, cb) {
  // 一上来先绑定再解绑肯定不行，所以要用切片编程
  const one = () => { // 绑定执行完毕后移除，切片编程的作用就是增加逻辑，但是这样会带来一个问题就是我绑定之后立马解绑会出现问题因为我们绑定的是one跟实际上绑定和解绑的函数并没有关系
    cb();
    this.off(eventName, one)
  }
  one.l = cb
  this.on(eventName, one);
}
module.exports = EventEmitter
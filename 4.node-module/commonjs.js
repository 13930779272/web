/**
 * node中的代码调试:
 *  直接在vscode中调试
 *  Chrome中调试 node --inspect-brk 需要调试的文件
 *  命令行里调试 
 * 
 * require流程
 *  1.调用module.require方法 -> module.prototype.require方法
 *  2.Module._load 加载模块
 *  3.Module._resolveFilename 方法把路径变成了绝对路径并且添加了后缀名 （.js .json） .node
 *  4.new Module 拿到绝对路径创造一个模块 id：文件名 this.exports = {}
 *  5.module.load 对模块进行加载
 *  6.根据文件后缀 Module._extensions['.js'] 去做策略加载
 *  7.用的是同步读取文件把内容传到 module._compile
 *  8.增加一个函数的壳子 并且让函数执行 让 module.exports 作为了this
 *  9.用户会默认拿到module.exports的返回结果 导出的时候是module.exports = xxx所以能拿到里面的属性
 *  10.最终返回的是 exports对象
 * 
 *  return mod.require(path); mod => Module的实例 -> 
 *  Module.prototype.require = function(id) ~
 *  return Module._load(id, this, false) -> 
 *  const filename = Module._resolveFilename(request, parent, isMain) 对文件路径进行处理拿到一个 filename ~
 *  const cachedModule = Module._cache[filename]; 查看这个模块是否有缓存 ~
 *  const mod = loadNativeModule(filename, request, experimentalModules); 查看模块是否是原生模块 ~
 *  const module = new Module(filename, parent); 不是原生模块创造一个模块并且把被引用模块的绝对路径（filename）和引用模块（parent）当作参数传进去 ->
 * 
 *  function Module(id = '', parent) { module方法
 *    this.id = id; 文件名
 *    this.path = path.dirname(id);
 *    this.exports = {};
 *    this.parent = parent;
 *    updateChildren(parent, this, false);
 *    this.filename = null;
 *    this.loaded = false;
 *    this.children = [];
 *  }  <-
 *  Module._cache[filename] = module; 把这个模块放到缓存中 ~
 *  module.load(filename); 对这个模块进行加载，第一次加载是解析出绝对路径并且创造一个模块， 这次是真正的加载这个模块 ~
 *  return module.exports; 最终返回这个
 *  ->module.load  const extension = findLongestRegisteredExtension(filename); 判断文件的扩展名 ~
 *  Module._extensions[extension](this, filename); 策略模式 ->
 *  Module._extensions['.js'] = function(module, filename) {……} ~
 *  const content = fs.readFileSync(filename, 'utf8'); content = 'var a = 100\r\nmodule.exports = a' 读取到文件的主体内容 ~
 *  module._compile(stripBOM(content), filename);读到的内容传到_compile中 ->
 *  Module.prototype._compile = function(content, filename) ~
 *  compiledWrapper = vm.runInThisContext ~
 *  compiled = compileFunction( 
 *  compiled  exports, require, module, __filename, __dirname
 *  const dirname = path.dirname(filename);
 * 
 *  const require = makeRequireFunction(this, redirects);
 *  let result;
 *  const exports = this.exports;
 *  const thisValue = exports;
 *  const module = this;
 *  if (requireDepth === 0) statCache = new Map();
 *  if (inspectorWrapper) {
 *    result = inspectorWrapper(compiledWrapper, thisValue, exports, require, module, filename, dirname);
 *  } else {
 *    result = compiledWrapper.call(thisValue, exports, require, module, filename, dirname);
 *  }
 *  if (requireDepth === 0) statCache = null;
 *  return result;
 */
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const { extname } = require('path');
function Module (id) {
  this.id = id;
  this.exports = {}
}
// 模块加载的策略模式
Module._extensions = {
  '.js' (module) {
    let script = fs.readFileSync(module.id, 'utf8');
    let templateFn = `(function (exports, module, req, __dirname, __filename){${script}})`
    console.log(1111)
    let fn = vm.runInThisContext(templateFn);
    let exports = module.exports;
    let thisVal = exports;
    let filename = module.id
    let __dirname = path.dirname(filename);
    // 函数的call 的作用 1.改变this指向 2.让函数指向 this = module.exports = exports;
    fn.call(thisVal, exports, module, req, __dirname, filename); // 调用了a模块 module.exports = 100;
  },
  '.json' (module) {
    let script = fs.readFileSync(module.id, 'utf8');
    module.exports = JSON.parse(script)
  }
}
// 解析文件路径
Module._resolveFilename = function (filename) {
  // 把文件路径改为绝对路径
  let filePath = path.resolve(__dirname, filename);
  // 判断是否存在这个文件
  let isExist = fs.existsSync(filePath);
  // 如果存在返回
  if(isExist) return filePath;
  // Reflect等价于Object，Module._extensions处理文件的几种格式
  let fileTypeKeys = Object.keys(Module._extensions);
  // 如果不存在就拿到所有的文件类型逐个拼接判断
  for(let i = 0; i < fileTypeKeys.length; i++) {
    let newPath = filePath + fileTypeKeys[i];
    if (fs.existsSync(newPath)) return newPath
  }
  // 如果还找不到文件就报错
  throw new Error('module not found')
}
Module.prototype._load = function () {
  // 拿到模块的扩展名，进行策略加载
  let extname = path.extname(this.id);
  // 找到对应的模块策略进行模块解析
  Module._extensions[extname](this)
}
Module._cache = {}
function req(filename) {
  // 拿到解析正确的文件路径
  let filePath = Module._resolveFilename(filename);
  // 查看是否有模块缓存
  let moduleCache = Module._cache[filePath];
  // 如果有缓存就直接返回缓存的exports
  if (moduleCache) return moduleCache.exports;
  // 创建一个module
  let module = new Module(filePath);
  // 把模块放入缓存
  Module._cache[filePath] = module
  console.log('缓存测试')
  // 模块加载
  module._load();
  // 最后返回模块的 module.exports
  return module.exports

}
let a = req('./a');
// a = require('./a');
// a = require('./a');
console.log(a,111)
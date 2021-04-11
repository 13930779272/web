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
 *  9.用户会默认拿到module.exports的返回结果 导出的时候是module.ecports = xxx所以能拿到里面的属性
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
let a = require('./a');
console.log(a)
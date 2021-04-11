const fs = require('fs');
const path = require('path');
const vm = require('vm')
/**
 * node中的模块 主要是两种规范
 *  esModule es6静态模块好处就是可以在编译的时候进行tree-shaking（tree-shaking可以在编译的时候分析用了模块里的哪些方法没用那些方法）
 *  commonjs 动态模块无法做tree-shaking
 * 
 * webpack打包后会把esModule打包成commonjs
 * 
 * commomjs模块规范
 *  1.每一个文件都是一个模块（每个模块外面都有一个自执行函数）
 *  2.文件需要被别人使用就需要导出 module.exports = xxx
 *  3.如果需要使用其他模块就需要require
 * 
 * 
 * 模块的分类
 *  1.node中的核心模块内置模块（fs\vm\path\http）
 *  2.第三方模块（需要先安装 co）
 *  3.文件模块别人引用的时候需要通过路径来引用（相对或者绝对）
 * 
 * fs
 *  readFileSync: 同步读取文件（路径是绝对路径否则会报错）
 *  existSync: 查看文件是否存在
 * 
 * path
 *  resolve(): 解析绝对路径，解析默认采用process.cwd()， 一般会配合__dirname使用不会导致路径错误, 如归遇到 '/' 会回到根目录
 *  join(): 仅仅是拼接路径不会产生绝对路径，遇到/也会正常拼接，也会配合__dirname使用
 *  extname(): 取扩展名
 *  basename(): 获取基本名
 *  relative(): 根据路径获取相对路径
 *  dirname():取当前文件的父路径
 * 
 * 字符串如何变成js代码来执行
 *  eval：会受执行环境影响
 *  new Function 模板引擎实现原理，不会受环境影响, 平级作用域，可以获取全局的（global）变量，可能会有污染
 * 
 * node中的全局变量是多个模块下共享的所以不要通过glo
 * bal来定义属性
 * 
 * vm: node中自己实现的一个 不受全局影响（沙箱环境） 实现沙箱环境方法：1.快照（执行前记录信息，执行后还原信息） 2.proxy来实现
 *  runInThisContext: 在当前上下文执行，因为node模块会默认加一个自执行函数所以是拿不到当前上下文的变量的
 *  runInNewContext: 在一个新的环境执行
 * 
 * 
 * require的实现
 *  1.读取文件
 *  2.读取到的文件给文件包装一个函数
 *  3.通过runInThisContext将他变成js语法
 *  4.调用
 */


// let r = fs.readFileSync('c:\\webWork\\framework\\web\\4.node-module\\a.js', 'utf8')
// console.log(fs.existsSync('c:\\webWork\\framework\\web\\4.node-module\\a.js'))
// console.log(r)


// let p = path.resolve(__dirname, 'q', '/', 'r')
// p = path.join('q', 'e', 'r')
// console.log(path.extname('a.js'))
// console.log(path.basename('a.js', 's'))
// console.log(path.relative('q/w/e/r/t/a.js','w')) // ..\..\..\..\..\..\w
// console.log(path.dirname('q/e/r/r'))


// eval('console.log(1)')
// console.log(new Function('a', 'b', 'console.log(a)').toString())
// let a = 1000
// new Function('a', 'b', 'console.log(a)')() // 打印undefined不会去当前的作用域查找，因为与当前作用域是平级的作用域


var a = 100
// var a = 100 等价于 (function(){ var a = 100; console.log(a)})()

vm.runInThisContext('console.log(this.a)')
// vm.runInNewContext('console.log(a)')
// vm.runInContext('console.log(1)')
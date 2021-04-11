const fs = require('fs')
console.log(this === global)
// (function (){
  
//   console.dir(this, {showHidden: true})
// })()

// console.log(__dirname) // 当前文件执行的绝对路径
// console.log(__filename) // 当前文件的绝对路径


/**
 * node中this为一个空对象，在函数中是global
 * __dirname: 当前文件执行的绝对路径
 * __filename: 当前文件的绝对路径
 * process中的属性：
 *  1.platform: 代表平台  win32  Mac:darwin
 *  2.chdir: 更改当前的工作目录（一般用不到）
 *  3.cwd ：当前的工作目录,在那个目录执行就是哪，如果用chdir命令改变的当前的工作目录的话，再执行process.cwd()就会拿到刚刚设置的工作目录，在实际项目中一般用不到chdir,只是用process.cwd()获取当期的工作目录
 *  4.env ：环境变量（用户变量和系统变量）
 *    process.env.NODE_ENV = 'aaa' ||  win下是 set a=1 Mac下export a=1 设置环境变量
 *    process.env.NODE_ENV  拿到环境变量
 *  5.argv：我们执行文件的时候后面输入的后缀命令（会根据用户传递的参数来解析）  
 *    例如 (执行node 1.js --port 3000) => ['C:\\Program Files\\nodejs\\node.exe','C:\\webWork\\framework\\web\\1.js','--port','3000']
 *    数组的组成 [执行node所在的exe文件, 当前执行的文件绝对路径, 其他的用户参数]
 *  6.nextTick: 不属于node中的eventLoop,优先级比promise更高
 *  7.startsWith：检测字符串以什么开头  '--string'.startWith('--') => true
 */
// console.log(process.cwd()) // 当前的目录

// process.chdir('../') //更改目录
// console.log(process.cwd()) // 更改之后目录
// process.env.NODE_ENV = 'development'

// if (process.env.NODE_ENV === 'development') {
//   console.log('development')
// } else {
//   console.log('prodction')
// }

// console.log(process.argv) 
// let argv = process.argv.slice(2).reduce((memo, argvItem, index, argv) => {
//   if (argvItem.startsWith('--')) {
//     memo[argvItem.slice(2)] = argv[index + 1]
//   }
//   return memo
// },{})
// console.log(argv) // 所有的参数对象

/**
 * commander、args：命令行管家, 写命令行工具，开发cli
 */
// const program = require('commander')
// program.option('-p --port <n>', 'set user port')
// program.option('-f --file <n>', 'set user file')
// program.version('1.0.0').command('create').description('创建文件').action(() => {
//   console.log('创建项目')
// })
// program.arguments('<username> [password]').action((username, password) => {
//   console.log(username, password)
// })
// program.parse(process.argv);
// const options = program.opts()
// if(options.port === '3000') {
//   console.log('端口为3000')
//   return 
// }
// console.log(options)


/**
 * nextTick: 在当前执行栈的底部，优先级比promise更高，执行完同步代码就执行nextTick
 */

// Promise.resolve(1).then((data) => {
//   console.log(data, 'promise')
// })

// process.nextTick(() => { // 会比上面的Promise优先执行
//   console.log('nextTick')
// })

/**
 * node的事件环：（https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/）
 *  1.先执行完主执行栈的代码
 *  2.nextTick
 *  3.promise.then()
 *  4.异步队列去取一个宏任务放到主执行栈执行
 *  5.继续重复1 2 3 步骤
 * 新老node的事件循环对比
 *  11版本之前是每清空一个异步队列（node有多个异步队列、每一个队列有多个异步任务）才执行微任务，新版是每执行一个宏任务就清空一次
 */

// console.log('主执行栈') // 图一

// setTimeout(() => {
//   console.log('setTimeout')
// },0)

// setImmediate(() => {
//   console.log('setImmediate')
// })

// console.log(0o777)


// fs.readFile('./1.js', 'utf-8', () => {
//   setTimeout(() => {
//     console.log('setTimeout')
//   },0)

//   setImmediate(() => {
//     console.log('setImmediate')
//   })
// })


// setTimeout(() => {
//   console.log('setTimeout')
// },10) // 时间填写 0、5、10会有三种不同的执行结果（如图二）

// fs.readFile('./1.js', 'utf-8', () => {
//   console.log('poll')
// })

// setImmediate(() => { 
   
//   console.log('setImmediate')
// })


/**
 * global
 * module exports require 不在global上但是可以直接使用
 * 每个文件都是一个模块，模块化的实现借助的是函数，每一个函数都是一个作用域
 * 函数中有五个参数 __dirname __filename module exports require
 * 
 * 模块化规范  commonjs amd cmd umd systemjs
 * 模块化规范为了解决命名冲突问题，但是不能完全解决这些问题（命名的问题如果命名简单就容易使用但是简单的命名不多，如果命名复杂的话调用起来就会很难受）
 * 用文件拆分的方法配合iife（自执行函数）来解决这个问题
 * 以上问题解决了又出现了依赖的问题 （amd cmd依赖前置）
 * 
 * umd兼容 amd umd commonjs 规范 ，但是不兼容esModule,所以现在打包都会有两种模块 umd模块和esModule模块
 * 
 * commonjs规范(基于文件读写 动态的)
 *  一个文件就是一个模块，我想给别人用就module.exports导出，别人想用我就要require
 * 
 * esModule规范(每次引用一个模块就要发请求 静态的) 靠webpack编译 <script type="module"></script> vite就是靠发请求，对请求来劫持进行转义来实现的
 *  一个文件就是一个模块，我想给别人用就export导出，别人想用我就要 import form （es7:import()）
 * 
 * 
 */
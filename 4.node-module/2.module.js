/**
 * node中的模块
 *  1.内置的核心模块，node中自带的 引用直接是模块名
 *  2.文件模块，引用的是相对路径（绝对路径也可以一般都是相对路径，因为在我这是c://的某个文件到别人那就不一定了）
 *  3.第三方模块
 */


/**
 * node文件模块的查找规范（先判断（根据路径）是不是核心模块和第三方模块，如果不是再查找）
 *  1.如果require('xxxx')的路径是是一个目录会默认找到目录下的index文件，如果没有index文件找不到就报错了；
 *  2.可以给一个package.json描述文件，在main字段指定入口文件,如果指定的入口文件找不到会接着找index文件；
 *  3.新版本node：会优先查找同名的js文件，如果找不到尝试添加 .js 或者 .json 查找文件（优先 .js），如果还是找不到就找同名的目录（当成一个包模块），先查找package.json 找入口文件，如果没有就找index.js文件，还找不到就报错了
 *  4.老版本node: 会先查找包如果有package.json就找包， 如果没有package.json 就查找文件 （很混乱已废弃）
 */
// const jquery = require('./jquery');
// console.log(jquery)

/**
 * 第三方模块查找规范（模块都是有描述信息，否则无法上传）引用也是根据模块名 1.全局的模块 2.代码中的第三方模块
 *  会沿着目录向上查找node-modules文件夹下的同名文件夹（如果有node_modules下一个同名文件会找到这个文件），根据package.json找到入口文件，如果没有就找index.js,r如果没有回继续向上查找，知道赵丹跟目录，如果还没有就报错
 */

const co = require('co');
console.log(co)
console.log(module.paths) // 查找路径
// [
//   'c:\\webWork\\framework\\web\\4.node-module\\node_modules',
//   'c:\\webWork\\framework\\web\\node_modules',
//   'c:\\webWork\\framework\\node_modules',
//   'c:\\webWork\\node_modules',
//   'c:\\node_modules'
// ]

/**
 * 包的安装 1.全局的模块 安装到电脑的npm下（查看全局安装目录 npm root -g） 执行命令时会找到环境变量 只能在命令行里使用，不能require引用
 *  npm默认在电脑的环境变量里所以可以直接使用，安装的全局模块都在npm下生成了一个快捷方式所以也可以直接使用（图三）
 *  npm(node package manager) (不要使用cnpm 安装模块时无法锁定版本，会出现很多问题)
 *  mime模块：解析文件类型
 *  3n模块：npm nrm nvm
 * 
 * 自己实现全局包想要在全局使用
 *  1.空目录下执行 npm init -y 初始化包
 *  2.package.json下配置bin命令是一个字符串或者对象
 *  3.添加执行方式 #! /usr/bin/env node
 *  4.npm link（图四）软链 or 把这个包发布到npm再安装下来
 * 
 * 包的安装 2.本地安装的模块
 *  开发依赖（开发时使用，上线就不需要了 webpack gulp等） 生产依赖（上线了依然需要 vue react等） 同等依赖 打包依赖 可选依赖
 *  npm install XXX , --save-dev :安装到开发环境  --save或者不加参数安装到生产环境（开发生产都能用）
 *  npm 5.2版本以后安装共同的模块会只会安装一次除非版本不一样
 *  .bin 目录代表你安装的一些模块可以在命令行中使用
 *  在package.json文件的script属性下可以自定义一些执行脚本 需要用npn run XXX 去执行，当执行npm run 的时候会把.bin文件临时加到环境变量里（npm run env 可以看到），执行完后会删除
 *  npx 类似npm run npx执行时如果没有对应的模块会先把模块安装上执行完成后删除
 * 
 * 
 * 
 *  devDependencies：放的是开发依赖
 *  dependencies： 放的是生产依赖 装包时npm install --production 代表只安装生产依赖
 *  peerDependencies: 同等依赖 跟生产依赖同等的，安装生产依赖时会提示还需要安装同等依赖里面的依赖，只会提示不会自动安装，不装也没事 例如 vue和vue-template-compiler
 *  optionalDependencies: 可选依赖
 *  bundledDependencies：打包依赖 :npm pack时会把当前目录打成一个压缩包，并且会把这里面的依赖也打进去放到node_modules里，如果没有打包依赖打的包不会有node_modules
 * 
 * npm版本号
 */
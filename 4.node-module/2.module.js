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
 * 包的安装 1.全局的模块 安装到电脑的npm下 执行命令时会找到环境变量
 *  npm(node package manager) (不要使用cnpm 安装模块时无法锁定版本，会出现很多问题)
 */
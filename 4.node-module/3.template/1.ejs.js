/**
 * 模板引擎的实现
 *  new Function + with实现
 */
// const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const read = util.promisify(fs.readFile)

// 简单的模板引擎
let ejs = {
  async renderFile (filename, options) {
    let content = await read(filename, 'utf8');
    content = content.replace(/<%=(.+?)%>/g, function () {
      console.log(arguments[1])
      return options[arguments[1]]
    });
    return content;
  }
};

(async function () {
  let r = await ejs.renderFile('C:\\webWork\\framework\\web\\4.node-module\\3.template\\1.template.html', {name: '刘月鹏', age: 19});
  console.log(r)
  /* 
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>模板</title>
  </head>
  <body>
    刘月鹏 19
  </body>
  </html>
   */
})()

/**
 * events 模块的实现 发布订阅
 */
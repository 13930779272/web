/**
 * 模板引擎的实现
 *  new Function + with实现
 */
const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const read = util.promisify(fs.readFile);


(async function () {
  let r = await ejs.renderFile('C:\\webWork\\framework\\web\\4.node-module\\3.template\\2.template.html', {arr: [1,2,3,4,5,6]});
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
    
      <li>1</li>
    
      <li>2</li>
    
      <li>3</li>
    
      <li>4</li>
    
      <li>5</li>
    
      <li>6</li>
    
  </body>
  </html>
   */
})();

/**
 * events 模块的实现 发布订阅
 */
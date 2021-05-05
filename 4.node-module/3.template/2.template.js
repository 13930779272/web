function fn (obj){
  let str = '';
  with(obj){
    str += `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>模板</title>
    </head>
    <body>`
      arr.forEach((item)=>{
        str += `<li>${item}</li>`
      })
    str += `</body>
    </html>`
  }
  return str
}
console.log(fn({arr:[1,2,3,4,5,6]}))



// 字符串拼接，我们最后要的就是str


// let str1 = '121314151617181910'
// str1.replace(/1+?/g , function (){
//   console.log(arguments)
// })
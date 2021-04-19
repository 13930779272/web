var a = 100
this.b = 1000
exports.c = 10000
console.log(this === module.exports)
module.exports = a
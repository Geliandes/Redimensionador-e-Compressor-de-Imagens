var fs = require('fs')
var array = fs.readFileSync('insercao de links.txt').toString().replace(/(\r\n|\n|\r)/gm, "").split(",");

const textoFinal = {
    arrayDeLinks: array
}
console.log(textoFinal.arrayDeLinks)

module.exports = textoFinal
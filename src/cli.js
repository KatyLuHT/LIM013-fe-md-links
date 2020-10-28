#!/usr/bin/env node
const colors = require('colors')
const { totalUnique, broken } = require('./Options.js')
const mdlinks  = require('./mdlinks.js');
const { convertAbsolute } = require('./index.js');


const argumento = process.argv.slice(2)
if (argumento.length === 1) {
  mdlinks(argumento[0]).then(resp => console.log(resp))
}
if (argumento.length === 2) {//argumento es array posicion 0=url 1=validate 2=stats
  if (argumento[1] === '--validate') {
    mdlinks(argumento[0], { validate: true }).then(resp => console.log(resp))
  } else if (argumento[1] === '--stats') {
    mdlinks(argumento[0], { validate: true }).then(resp => console.log(colors.bgCyan(totalUnique(resp))))
  }
}
if (argumento.length === 3) {//
  if (argumento[1] === '--stats' && argumento[2] === '--validate') {
    mdlinks(argumento[0], { validate: true }).then(resp => console.log(colors.bgCyan(totalUnique(resp))))
  }
}
//md-links C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md --stats

#!/usr/bin/env node
const mdLinks = require('./mdlink');
const colors = require('colors')

const argumento =process.argv.slice(2)

// console.log('hola');
  if(argumento.length === 1){
      // console.log('holakaty');
      mdLink(argumento[0]).then(resp => console.log(resp))
  }



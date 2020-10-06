const path = require('path'); //  modulo para trabajar con rutas de archivos y directorios
const fs = require('fs'); // fs sistema de modulo(archivo)

// funcion que verifica con el metodo path.isAbsolute si es una ruta absoluta
const IsAbsolute = (ruta) => path.isAbsolute(ruta);

// funcion que transforma a ruta absoluta
const ResolveRuta = (ruta) => path.resolveRuta(ruta);

// SINCRONO: es aquel código donde cada instrucción espera a la anterior para ejecutarse
// permite tener una mejor respuesta en las aplicaciones y reduce el tiempo de espera del cliente.
// ASINCRONO: no espera a las instrucciones diferidas y continúa con su ejecución

// funcion que verifica si es un archivo
const IsFile = (ruta) => fs.statSync(ruta);

// devolver información sincrónicamente sobre el enlace simbólico que se utiliza para
// hacer referencia a un archivo o directorio

// funcion que verifica si es un directorio
const IsDirectory = (ruta) => fs.lstatSync(ruta).IsDirectory();
// console.log('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links');

// funcion que verifica  si es un archivo markdow
// path.extname devuelva la extension de la ruta .md
const IsFilemd = (ruta) => path.extname(ruta);

// function  que recorre un link

module.exports = {
  IsAbsolute,
  ResolveRuta,
  IsFile,
  IsDirectory,
  IsFilemd,
};

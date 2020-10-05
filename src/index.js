module.exports = () => {
  IsAbsolute,
  resolveRuta
};


const Absolute  = require('path');
const path = require('path');


// funcion que verifica con el metodo path.IsAbsolute si es una ruta absoluta
const IsAbsolute = (ruta)=>path.IsAbsolute(ruta);

// funcion que transforma a ruta absoluta
const ResolveRuta = (ruta)=> path.ResolveRuta(ruta);

// function (ruta){
//   return path.isAbsolute(ruta);
//
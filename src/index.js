const path = require('path'); //  modulo para trabajar con routes de archivos y directorios
const fs = require('fs'); // fs sistema de modulo(archivo)
const marked = require('marked');
const index = require ('./index.js');

// funcion que verifica si es una route absoluta
const IsAbsolute = (route) => path.isAbsolute(route);

// funcion que transforma a route absoluta
const ResolveRoute = (route) => path.resolve(route);

// funcion que verifica si es un archivo
const IsFile = (route) => fs.statSync(route).isFile();

// funcion que permite leer un directorio
const ReadDirectory = (route) => fs.readdirSync(route);

// funcion que verifica si es un directorio
const IsDirectory = (route) => fs.lstatSync(route).isDirectory(); // ojo revisar lstatSync: es para prueba

// funcion que verifica  si es un archivo markdow
//método devuelve la extensión del path .md
const IsFilemd = (route) => path.extname(route);

//--------------------------------------- funcion lee el contenido de una ruta de directorio--------------------------------

function listcontent(route) { // lee el contenido del directorio y devuelve lista de contenido(prueba1.md prueba2.md)
  return fs.readdirSync(route);
}
// console.log(listcontent('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba2'));

// ------------------------------Funcion que convierte una ruta relativa a una route absoluta------------------------------
const convertRouteAbsolute = ((route) => {
  if (!IsAbsolute(route)) { // si isabsolute es distinto a route absoluta
    return ResolveRoute(route);// ruta relativa transformado a absoluta
  }
  return route; // muestre la route inicial (absoluta)
});
console.log( convertRouteAbsolute('src\Prueba2')); //transforma a relativa

// ****************************************funcion principal********************************************************************************
const metodoprincipal = ((route) => {
let arraymdFiles = [];// aqui se almacenara archivos md
  const routeAbsoluta = convertRouteAbsolute(route); //ruta absoluta sera igual a funcion convertRouteAbsolute(transformacion de ruta)
  console.log ("Nueva route "+ routeAbsoluta);
  console.log("****");
 console.log(listcontent(routeAbsoluta));
  let arrayresult = [];// se almacenaran objetos
  arrayresult=listcontent(routeAbsoluta);//liscontent trae toda los objeto de la route(archivo.md,nueva carpeta)y lo trae en un array
  arrayresult.forEach(element=>{ //recore cada elemento(1x1)
    if(IsFilemd(element)==='.md') { // por cada elemento preguntamos si tiene extencion .md
      arraymdFiles.push(element);//arrayfiles contendra elemento con .md y con push agregamos el elemento al array
      console.log('tiene extencion md');
    }
  });
  arraymdFiles.forEach(element=>{ //recorrer cada elemento files.md
    console.log(element);
  })

  // 2) es un file ?
    if(IsFile(routeAbsoluta)){ // si la route pasada no devuelve un archivo
      console.log("es un file****");
    }else{
      console.log("No es un file")
      return false;
    }
    if(IsFilemd(routeAbsoluta)===".md"){
      arraymdFiles.push(routeAbsoluta);
      console.log ("archivo .md");
      return true
    }else{
      console.log("El archivo no tiene extension .md")

    }
});

// console.log('inicio_Katy');
// console.log(metodoprincipal('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));
// console.log("metodo nuevo "+ metodoprincipal('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba\\prueba 2.md'));
// console.log("metodo nuevo "+ metodoprincipal('Prueba2'));
// console.log('fin_katy');



////************************ANTES **************************** */
// funcion que verifica si es directorio
// const encontrarFile = (route) => {
//   if (!IsFile(route)) { // si isfile es distinto a la route
//     // return IsDirectory(route); // entonces verificar si es directorio
//     return LeeDirectorio(route); // lee directorio
//   }
//   return route;
// };

// const readingDirectories = (route) => fs.readdirSync(route);


//------------------------------------------------------------------------------------------//

const getMdFiless = (route)=>{
  let arrayresult = [];
  let arraymdFiles =[];
  arrayresult=listcontent(route);//Funcion liscontent trae todos los objeto de la route(archivo.md,nueva carpeta)y lo traen un array
  // console.log('hola');
  // console.log(arrayresult);
  arrayresult.forEach(element=>{ //recorer elelemento
    if(IsFilemd(element)==='.md') { // por cada elemento preguntamos si tene exten .md
      arraymdFiles.push(element);//arrayfiles contendra elemento con .md push agregar elemento al array
      // console.log('tiene extencion md')
    }
  }); // en este array se iran agregando archivos
return arraymdFiles;
};
// console.log('inicio');
// console.log(getMdFiless('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2'));
// console.log('fin');

// -----------------------------------------Funcion para extraer links---------------------------------------------------//
const extraerLinks= (route) => {
  if (!IsAbsolute(route)) {
  } else {
    const newRouteAb = ResolveRoute(route);
    let lastArrayLinks = []; //últimos enlaces de matriz
    const renderer = new marked.Renderer();
    console.log('hello');
    newRouteAb.forEach((file) => {
      renderer.link = (href, title, text) => {
        const InfoLink = {
          href:href,
          text:text,
          file:file,
        };
        lastArrayLinks.push(InfoLink);
      };
      marked(ReadDirectory(file), { renderer });
    });
    return lastArrayLinks;
  }
};

  console.log('inicializa');
  console.log(extraerLinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba2\\archivo2.md'));
  console.log('finaliza');

module.exports = {
  IsAbsolute,
  ResolveRoute,
  IsFile,
  ReadDirectory,
  IsDirectory,
  IsFilemd,
  listcontent,
  convertRouteAbsolute,
  metodoprincipal,
  getMdFiless,
  extraerLinks,

};

const path = require('path'); //  modulo para trabajar con routes de archivos y directorios
const fs = require('fs'); // fs sistema de modulo(archivo)
const marked = require('marked');
const index = require ('./index.js');
const fetch = require('node-fetch');
const { isAbsolute, resolve } = require('path');
const { rejects } = require('assert');


//Funcio que verifica si existe la route
const existsRoute = (route) => (fs.existsSync(route));

//funcion que transforma una route relativa absoluta
const Isabsolute =(route) => (path.isAbsolute(route));

//funcion que verifica si es archivo
const IsFile = ((route) => fs.statSync(route).isFile());

// const IsDirectory= (route) => fs.readdirSync(route).isDirectory();

//Funcion que extrae si tiene extencion .md
const IsMd = (route) => (path.extname(route));

// funcion que lee directorio
const readDirectorio = (ruta)=>fs.readdirSync(ruta);


//--------------------------------------------FUNCIÓN para convertir route relativa a absoluta-----------------------------------//
const convertAbsolute = ((route) => {
  if(!Isabsolute(route)) { // si Isabsolute es distinto a la ruta
    const newAbsolute = path.resolve(route); // transforma ruta relativa a absoluta
    return newAbsolute;
  }
  return route; //retorna ruta inicial(seria absoluta)
});

// console.log(convertAbsolute('Prueba2'));


//-------------------------------------------Funcion que lee directorio--------------------------------------------------------------//

const ArrayFilesandDirectories = (route) => {
  return readDirectorio(route).map(element =>//se crea una nueva matriz con los elementos encontrados
    path.join(route, element),); // unimos los elementos en un array y lo separamos por ","
  };

// console.log(ArrayFilesandDirectories('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2')) // ruta

/* retorna [
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo.md', //Ruta prueba2  //elemto archivo.md
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md',
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\nuevaCarpeta'
]
*/

//------------------------------------------------FUNCIÓN que trae archivos .md--------------------------------------------------------//

// se pasa ruta 


const searchRoutemd = (route) => { //searchRoutemd buscar archivos de ruta
  let arrayMdFiles = []; // array almacenara archivos con extención .md
  const filePath = convertAbsolute(route); // asignamos ruta absoluta a filepath
  if (IsFile(filePath)) { // pregunta si es un archivo
    if (IsMd(filePath) === '.md') { //por cada elemento preguntamos si tiene extencion .md y la extrae
      arrayMdFiles.push(filePath);   //arrayfiles contendra elemento con .md y con push agregamos el elemento al array
    }
  } else {
    ArrayFilesandDirectories(route).forEach((element) => {// recorido por cada elemento de directorio
      const filesOfNewRoute = element;
      //obtener archivos MD en nueva ruta
      const getMDFilesInNewRoute = searchRoutemd(filesOfNewRoute);
      arrayMdFiles = arrayMdFiles.concat(getMDFilesInNewRoute); //concat() se usa para unir dos o más arrays arrayMdFiles, getMDFilesInNewRoute
    });// recursion
  }
  return arrayMdFiles;
};

console.log(searchRoutemd('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba'));

// se envia ruta de directorio

/*retorna solo archivos .md [
  'C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo.md',
  'C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'
]
*/
//------------------------------------------------Funcion que trae archivo---------------------------------------------------------//

//se envia console.log(readFilePath('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));
// resultado trae todo la informacion del archivo

const readFilePath = (route) => fs.readFileSync(route).toString();

//-----------------------------------------Funcion que nos permite extraer links de archivos--------------------------------------------

// se envia console.log(extraerLinks('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));
/* devuelve array de objetos
  [
  {
    href: 'https://www.geeksforgeeks.org/node-js-fs-statsync-method/',
    text: 'metodo',
    file: 'C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'MDN',
    file: 'C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'
  }
]
*/
const extraerLinks = (route) => {
      let arrayLinks = [];// aqui se ira agregando links
      const renderer = new marked.Renderer();
      searchRoutemd(route).forEach((file) => {    //ejecuta acción por cada elemento
        renderer.link= (href, title, text) => { // renderer define salida ouput con tres propiedades
          const linkProperties = {
            href, //url encontrada
            text, //texto que aprece dentro de link
            file //ruta de archivo deonde se encuentra link
          };
          arrayLinks.push(linkProperties); //con push se va agregando a arraylinks
        };
        marked(readFilePath(file), { renderer });
      });
      return arrayLinks; // devuelve links de carpeta dentro de src
    };

    // console.log(extraerLinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md'));

    // new Promise((resolve) =>


//--------------------------------------------------------------------------------------------------------------------------
 
  const validateOptions = (arrAllLinks) => {
    // const arrAllLinks = extraerLinks(ruta);
    // console.log(arrAllLinks);
    const statusLinks = arrAllLinks.map((element) => fetch(element.href)
   
      .then((res) => ({
        href: element.href,
        text: element.text,
        path: element.file,
        status: res.status,
        statusText: res.statusText,
        // console.log();
      })));
    return Promise.all(statusLinks);
  };

  // validateOptions('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2').then((res)=>console.log(res));




  // console.log(Validate('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2'));
  // console.log(Validate('../Prueba2'));

// --validate
// metodo 200 OK
// MDN 200 OK


// console.log(validate('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo.md'));


// Una promesa puede presentar los siguientes estados:

// fulfilled - La acción relacionada a la promesa se llevó a cabo con éxito
// rejected - La acción relacionada a la promesa falló
// pending - Aún no se ha determinado si la promesa fue fulfilled o rejected
// settled - Ya se ha determinado si la promesa fue fulfilled o rejected


module.exports = {
  existsRoute,
  IsFile,
  IsMd,
  convertAbsolute,
  searchRoutemd,
  readFilePath,
  extraerLinks,
  validateOptions

};
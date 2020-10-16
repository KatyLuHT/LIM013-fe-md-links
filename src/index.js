const path = require('path'); //  modulo para trabajar con routes de archivos y directorios
const fs = require('fs'); // fs sistema de modulo(archivo)
const marked = require('marked');
const index = require ('./index.js');
const fetch = require('node-fetch');
const { isAbsolute } = require('path');


//Funcio que verifica si existe la route
const existsPath = (route) => (fs.existsSync(route));

//funcion que transforma una route relativa absoluta
const Isabsolute =(route) => (path.isAbsolute(route));

//funcion que verifica si es archivo
const IsFile = ((route) => fs.statSync(route).isFile());

// console.log('hola katy');
// console.log(IsFile('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));

// const IsDirectory= (route) => fs.readdirSync(route).isDirectory();

//Funcion que extrae si tiene extencion .md
const IsMd = (route) => (path.extname(route));

// funcion que lee directorio
const readDirectorio = (ruta)=>fs.readdirSync(ruta);



//-------------------------------------------Funcion que lee directorio--------------------------------------------------------------//

const getArrayOfFilesAndDirectories = (route) => {
  return readDirectorio(route).map(element =>//se crea una nueva matriz con los elementos encontrados
    path.join(route, element),); // unimos los elementos en un array y lo separamos por ","
  };

//console.log(getArrayOfFilesAndDirectories('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2')) ruta

/* retorna [
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo.md', //Ruta prueba2  //elemto archivo.md
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md',
  'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\nuevaCarpeta'
]
*/

//--------------------------------------------FUNCIÓN para convertir route relativa a absoluta-----------------------------------//
const convertAbsolute = ((route) => {
  if(!Isabsolute(route)) { // si Isabsolute es distinto a la ruta
    const newAbsolute = path.resolve(route); // transforma ruta relativa a absoluta
    return newAbsolute;
  }
  return route; //retorna ruta inicial(seria absoluta)
});

// console.log(convertAbsolute('Prueba2'));

// const traerarcchivosmd = (ruta)=>{
//   let arraymd =[]
//   const path = convertAbsolute(ruta);
//   if(IsFile(ruta)){
//     if(Ismd(path)==='.md');{
//     arraymd.push(arraymd);
//     }
//   }



// }
//------------------------------------------------FUNCIÓN que trae archivos .md--------------------------------------------------------//

// se pasa ruta console.log(searchPathFiles('Prueba2'));

const searchPathFiles = (route) => {
  let arrayMdFiles = []; // array almacenara archivos con extención .md
  const filePath = convertAbsolute(route); // asignamos ruta absoluta a filepath
  if (IsFile(filePath)) { // pregunta si es un archivo
    if (IsMd(filePath) === '.md') { //por cada elemento preguntamos si tiene extencion .md y la extrae
      arrayMdFiles.push(filePath);   //arrayfiles contendra elemento con .md y con push agregamos el elemento al array
    }
  } else {
    getArrayOfFilesAndDirectories(route).forEach((element) => {// recorido por cada elemento de directorio
      const filesOfNewRoute = element;
      //obtener archivos MD en nueva ruta
      const getMDFilesInNewRoute = searchPathFiles(filesOfNewRoute);
      arrayMdFiles = arrayMdFiles.concat(getMDFilesInNewRoute); //concat() se usa para unir dos o más arrays arrayMdFiles, getMDFilesInNewRoute
    });
  }
  return arrayMdFiles;
};


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
/*
  {
    href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
    text: 'MDN',
    file: 'C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'
  }
*/
const extraerLinks = (route) => {
      let arrayLinks = [];// aqui se ira agregando links
      const renderer = new marked.Renderer();
      searchPathFiles(route).forEach((file) => {    //ejecuta acción por cada elemento
        renderer.link= (href, title, text) => { // renderer salida ouput con tres propiedades
          const propLink = {
            href, //url encontrada
            text, //texto que aprece dentro de link
            file //ruta de archivo deonde se encuentra link
          };
          arrayLinks.push(propLink); //con push se va agregando a arraylinks
        };
        marked(readFilePath(file), { renderer });
      });
      return arrayLinks; // devuelve links de carpeta dentro de src
    };

    // console.log(extraerLinks('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));



// ejemplo
// function readFilePromise(fileName)
// {
//     var promise = new Promise(function(resolve, reject) {
//         fs.readFile(fileName, function(err, buffer) {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(buffer);
//         });
//     });

//     return promise;
// }

// var promise = readFilePromise("file.txt");
// promise.then(
//     function(buffer) {
//         // console.log("FILE CONTENTS", buffer.toString());
//     },
//     function(err) {
//         // console.log("FILE READ ERROR", err);
//     }
// );
// console.log(addValidate('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'));

module.exports = {
  existsPath,
  extraerLinks,
};
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const index = require('./index.js');
const fetch = require('node-fetch');
const { isAbsolute } = require('path');
const { rejects } = require('assert');


//Función que verifica si existe la route
const existsRoute = (route) => (fs.existsSync(route));

//función que transforma una route relativa absoluta
const Isabsolute = (route) => (path.isAbsolute(route));

//función que verifica si es archivo
const IsFile = ((route) => fs.statSync(route).isFile());

//Función que extrae si tiene extención .md
const IsMd = (route) => (path.extname(route));

// función que lee directorio
const readDirectorio = (ruta) => fs.readdirSync(ruta);


//--------------------------------------------FUNCIÓN para convertir route relativa a absoluta-----------------------------------//
const convertAbsolute = ((route) => {
  if (!Isabsolute(route)) {
    const newAbsolute = path.resolve(route);
    return newAbsolute;
  }
  return route;
});

//-------------------------------------------FUNCIÓNque lee directorio--------------------------------------------------------------//

const ArrayFilesandDirectories = (route) => {
  return readDirectorio(route).map(element =>//se crea una nueva matriz con los elementos encontrados
    path.join(route, element)); //une los segmentos de ruta especificados en una ruta, unimos carpeta + archivo.md
};

//---------------------------------------------FUNCIÓN que trae archivos .md----------------------------------------------------------//

const searchRoutemd = (route) => {
  let arrayMdFiles = [];
  const filePath = convertAbsolute(route);
  if (IsFile(filePath)) {
    if (IsMd(filePath) === '.md') { //por cada elemento preguntamos si tiene extencion .md y la extrae
      arrayMdFiles.push(filePath); 
    }
  } else {
    ArrayFilesandDirectories(route).forEach((element) => {// recorrido por cada elemento de directorio
      const filesOfNewRoute = element;
      //obtener archivos MD en nueva ruta
      const getMDFilesInNewRoute = searchRoutemd(filesOfNewRoute);// recursion searchRoutemd se llama a si mismo
      arrayMdFiles = arrayMdFiles.concat(getMDFilesInNewRoute); //concat() se usa para unir dos o más arrays arrayMdFiles, getMDFilesInNewRoute
    });
  }
  return arrayMdFiles;
};

//------------------------------------------------FUNCIÓN que trae archivo---------------------------------------------------------//


const readFilePath = (route) => fs.readFileSync(route).toString();
// resultado trae todo la información del archivo

//-----------------------------------------FUNCIÓN que permite extraer links de archivos--------------------------------------------//

// devuelve array de objetos
 
const extraerLinks = (route) => {
  let arrayLinks = [];
  const renderer = new marked.Renderer();
  searchRoutemd(route).forEach((file) => {
    renderer.link = (href, title, text) => { // renderer define salida ouput con tres propiedades
      const linkProperties = {
        href,
        text,
        file 
      };
      arrayLinks.push(linkProperties);
    };
    marked(readFilePath(file), { renderer });
  });
  return arrayLinks;
};

//----------------------------------------------FUNCIÓN que retornara las 5 propiedades----------------------------------------------------------------------------

const validateOptions = (arrAllLinks) => {
  const statusLinks = arrAllLinks.map((element) => 
  fetch(element.href)
    .then((res) => { //la interfaz Response contiene el código de estado de la respuesta (ejm., 200 para un éxito).
      if((res.status >= 200) && (res.status <= 399)){
      //  return res.status 'ok'
        return {
          href: element.href,
          text: (element.text.substring(0, 50)),
          path: element.file,
          status: res.status,
          statusText: 'ok'
        }
      } else if((res.status < 200 )|| (res.status >=400)){
      	return {
          href: element.href,
          text: (element.text.substring(0, 50)),
          path: element.file,
          status: res.status,
          statusText: 'fail'
        }
      }})
    .catch((res) => {
      return {
        href: element.href,
        text: (element.text.substring(0, 50)),
        path: element.file,
        status:404,
        statusText: 'fail'
      }

      // res.status = 400;
      // // console.log('catch((res)',res);
      // res.statustext = 'fail';
    })
  
    );// if(element.status < 200 || element.status >=400  ){ return(statustext = 'fail');}
  return Promise.all(statusLinks);
};

// validateOptions('C:\\Users\\KELLY-PC\\Desktop\\katy-LIM013-fe-md-links\\src\\Prueba2').then((res)=>console.log(res));

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
const funciones = require('./index.js'); // (./) index esta dentro de la misma carpeta

// console.log(index);

const mdlinks = (stringpath,opcion) =>{ // creamos mdliks 2 parametros
    if (!funciones.existsPath(stringpath)) { // 
        throw new Error('Ruta invalida');
    }else{
        let links= funciones.extraerLinks(stringpath);
        //    console.log(links);
        new Promise(
            (resolve, reject)  => {
                resolve(links);
            }
        )
    }
};

mdlinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2');
/*
[
    {
      href: 'https://www.geeksforgeeks.org/node-js-fs-statsync-method/',
      text: 'metodo',
      file: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo.md'
    },
    {
      href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
      text: 'MDN',
      file: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo2.md'
    }
  ]
  */

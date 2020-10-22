const { validateOptions} = require('./index.js');
const funciones = require('./index.js'); // (./) index esta dentro de la misma carpeta


const mdlinks = (stringpath,options) =>{ // 2 parametros ruta opcion(validate)
    if (!funciones.existsRoute(stringpath)) {
        throw new Error('Ruta invalida');// lanza una excepción
    }else{
        const links= funciones.extraerLinks(stringpath);
          //  console.log(links);
        return new Promise(

            (resolve, reject)  => {  //resolve, se considera que la promesa ha resuelto correctamente
              // resolve(links);
                if(options.validate === true){
                  // console.log('holakaty');
                  resolve(validateOptions(links))
                }else {
                  // console.log('katy');
                  resolve(links);
                }
              }
        )
        // console.log(options);

    }
};

mdlinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2',{validate:false}).then((response)=> {console.log(response)});

// var miobjeto = {
//   name: 'KATY',
//   color: 'blue',
//   esmayordeedad:true,
// }


// --validate
// undefined
// 200 OK
// 200 OK



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

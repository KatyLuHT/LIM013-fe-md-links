const { validateOptions} = require('./index.js');
const funciones = require('./index.js'); 


const mdlinks = (stringpath,options) =>{
    if (!funciones.existsRoute(stringpath)) {
        throw new Error('Ruta invalida');
    }else{
        const links= funciones.extraerLinks(stringpath);
        return new Promise(

            (resolve, reject)  => {
                if(options.validate === true){
                  resolve(validateOptions(links))
                }else {
                  resolve(links);
                }
              }
        )
    }
};

mdlinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba',{validate:true}).then((response)=> {console.log(response)});

module.exports = {
  mdlinks,
}

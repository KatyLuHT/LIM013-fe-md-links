// const mdLinks = require('../');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

// const path = require ('path');
const {
  IsAbsolute,
  ResolveRoute,
  IsFile,
  IsDirectory,
} = require('../src/index.js');

describe('Testing to find out if IsAbsolute is a function', () => {
  it('should be a function', () => {
    expect(IsAbsolute('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba')).toBe(true);
  });
  it('should be a function', () => {
    expect(IsAbsolute('../Prueba')).toBe(false);
  });
});
// expect esperar
// toequal al igual - tobe ser o estar
describe('to convert relative path to absolute path', () => {
  it('should be a function', () => {
    expect(typeof ResolveRoute).toBe('function');
  });
  it('debería convertir a ruta absoluta', () => {
    expect(ResolveRoute('Prueba/Prueba1.md')).toBe('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba\\Prueba1.md');
  });
});

describe('Testing para saber si la ruta es directorio', () => {
  it('should be a function', () => {
    expect(typeof IsDirectory).toBe('function');
  });
  // it('IsDirectory debería dar true si es directorio', () => {
  //   expect(IsDirectory('C:\\Users\\KELLY-PC\\Documents\\
  // md-links\\LIM013-fe-md-links\\Prueba')).toBe(true);
  // });
  // it('IsDirectory debería dar false si es archivo', () => {
  //   expect(IsDirectory('C:\\Users\\KELLY-PC\\Documents\\
  // md-links\\LIM013-fe-md-links\\Prueba\\Prueba1.md')).toBe(false);
  // });
});

// should deberia
describe('Testing to find out if IsFile is a function', () => {
  it('should be a function', () => {
    expect(typeof IsFile).toBe('function');
  });
  it('it is expected to be a file', () => {
    expect(IsFile('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba\\Prueba1.md')).toBe(true);
  });
});

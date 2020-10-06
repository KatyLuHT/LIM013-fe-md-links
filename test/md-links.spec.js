// const mdLinks = require('../');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

// const path = require ('path');
const {
  IsAbsolute,
} = require('../src/index.js');

describe('Testing to find out if IsAbsolute is a function', () => {
  it('should be a function', () => {
    expect(IsAbsolute('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\Prueba')).toBe(true);
    expect(IsAbsolute('../Prueba')).toBe(false);
  });
});

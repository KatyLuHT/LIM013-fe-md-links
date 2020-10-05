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
        expect(IsAbsolute('path válido')).toBe(true);
        expect(IsAbsolute('path inválido')).toBe(false);
    });
});
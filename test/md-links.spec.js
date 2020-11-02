const {
  existsRoute,
  IsFile,
  IsMd,
  convertAbsolute,
  searchRoutemd,
  readFilePath,
  extraerLinks,
} = require('../src/index.js');

const mdlinks = require('../src/mdlinks');


describe('existsRoute', () => {
  it('should be a function', () => {
    expect(typeof existsRoute).toBe('function');
  });

  it('returns a boolean if the route existsRoute', () => {
     expect(existsRoute('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md')).toBe(true);
  });

  it('should return false for invalid path', () => {
      expect(existsRoute('./documents/example/')).toBe(false);
  });
});


describe('Testing to find out if convertAbsolute is a function', () => {
  it('should be a function', () => {
    expect(typeof convertAbsolute).toBe('function');
  });
    it('should convert an absolute path', () => {
      expect(convertAbsolute('../Prueba2/archivo.md')).toBe('C:\\Users\\KELLY-PC\\Documents\\md-links\\Prueba2\\archivo.md');
    });
  });


describe('Testing to find out if IsFile is a function', () => {
  it('should be a function', () => {
    expect(typeof IsFile).toBe('function');
  });
  it('it is expected to be a IsFile', () => {
    expect(IsFile('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md')).toBe(true);
  });
  it('It should return false if it is not an IsFile', () => {
    expect(IsFile('./test')).toBe(false);
  });
});


describe('Testing to find out if IsMd is a function', () => {
  it('should be a function', () => {
    expect(typeof IsMd).toBe('function');
  });
  it('should return the file extension', () => {
    expect(IsMd('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo.md')).toBe('.md');
  });
  it('should return empty if there is no extension', () => {
    expect(IsMd('.tex')).toBe('');
  });
});


describe('Testing to find out if searchRoutemd is a function', () => {
  it('should be a function', () => {
    expect(typeof searchRoutemd).toBe('function');
  });
  it('it should return all searchRoutemd with an .md extension', () => {
  
    const outputMd = [
      'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\prueba 2.md',
      'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md',
    ];
    expect(searchRoutemd('./test')).toEqual(outputMd);
  });
});


describe('test to extract Links', () => {
  test('it should return an array of objects with the 3 properties', () => {

    const ouput = [
   {
    href: 'https://nodejs.org/es/about/',
    text: 'Definicón de Node js',
    file: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md'
   }
  ];

    expect(extraerLinks('C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md')).toEqual(ouput);
  });
});

//-----------------------------------------------------MDLINK---------------------------------------------------//
describe('test for mdlinks', () => {
  test('It should return an array of objects with the 3 properties for validate: false', () => {
    const ouputMdlink = [
       {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Qu%C3%A9_es_JavaScript',
    text: 'Definicion de javascript',
    file: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\prueba 2.md'
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Definicón de Node js',
    file: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md'
  }
    ];
    return expect(mdlinks('./test/Prueba/', { validate: false })).resolves.toEqual(ouputMdlink);
  });
});

describe('mdlinks ', () => {
  test('It should return an array de objects whith the 5 properties for validate:true', () => {
    const ouputTrue = [
      {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Qu%C3%A9_es_JavaScript',
    text: 'Definicion de javascript',
    path: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\prueba 2.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Definicón de Node js',
    path: 'C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\test\\Prueba\\Prueba1.md',
    status: 200,
    statusText: 'OK'
  }
    ];
    return expect(mdlinks('./test/Prueba/', { validate: true })).resolves.toEqual(ouputTrue);
  });
});
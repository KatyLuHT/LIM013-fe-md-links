
const totalUnique = (links) => {
  const totalLinks = links.length;
  const myLinks = links.map((element) => element.href);
  const uniqueLinks = new Set(myLinks);
  const stats =
    `Total: ${totalLinks}
  Unique: ${uniqueLinks.size}`; // size devuelve el número de elementos que hay en el objeto Set.
  return stats;
};
// -----------------------------Función que verifica si hay algun link 'fail'----------------------------------------//
const broken = (links) => {
  // const brokenLinks = links.filter((element) => element.statusText === 'fail');
  const brokenLinks = Array.from(links).filter((element) => element.statusText === 'fail');
  const stats =
    `Broken: ${brokenLinks.length}`;
  return stats;
};

//C:\\Users\\KELLY-PC\\Documents\\md-links\\LIM013-fe-md-links\\src\\Prueba2\\archivo3.md
module.exports = { totalUnique, broken }


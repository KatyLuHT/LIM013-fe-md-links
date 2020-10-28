# Metodo Slice

El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.

## Descripción
slice no modifica el array original. Devuelve una copia plana (shallow copy) de los elementos especificados del array original. Los elementos del array original son copiados en el array devuelto de la siguiente manera:

Para referencias de objeto ( no el objeto en sí ), slice copia la referencia dentro del nuevo array. Ambos, el array original y el nuevo, referencian al mismo objeto. Si un objeto referenciado cambia, los cambios son visibles para ambos arrays.
Para strings, numbers y boolean (no objetos String y Number), slice copia los valores en el nuevo array. Los cambios a los string, numbers y boolean en un array no afectan a los del otro array.

[Metodo slice](https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)
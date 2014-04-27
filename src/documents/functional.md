---
name: Functional programming
layout: default
---

# Functional programming

¿Podemos considerar JavaScript como un lenguaje funcional? Pues [depende de la definición que utilicemos](http://stackoverflow.com/questions/3962604/is-javascript-a-functional-programming-language) de lenguaje funcional. Si definimos un lenguaje funcional como aquel que tiene first class functions (las funciones se pueden utilizar como parámetros y como valores a devolver), entonces podemos considerar JavaScript como un lenguaje funcional. En cambio si incluimos en la definición conceptos como inmutabilidad o pattern matching, entonces JavaScript no es un lenguaje funcional.

> Functional programming is the use of functions that transform values into units of ab‐ straction, subsequently used to build software systems.

> The major evolution that is still going on for me is towards a more functional program‐ ming style, which involves unlearning a lot of old habits, and backing away from some OOP directions.
--John Carmack


Vamos a utilizar [Underscore](http://underscorejs.org/), una librería que cuenta con un conjunto de funciones de utilidad funcionales. La librería delega en la funciones nativas del navegador si existe una implementación. Por ejemplo una llamada a `_.each` será una simple llamada a `.forEach` en el caso de que el navegador la soporte. Underscore es una librería muy importante, está el número 1 en la lista de los módulos más utilizados en [npm](https://www.npmjs.org/). 

También es interesante conocer [lo-dash](http://lodash.com/), un remplazo completo de Underscore, más eficiente y que añade algunas funcionalides, y [lazy.js](http://danieltao.com/lazy.js/), que no es un remplazo completo de Underscore, pero añade un concepto interesante, lazy evaluation, que hace que se dispare la eficiencia.

## ¿Por qué la programación funcional es importante?

¿Podrías decir a simple vista qué hace este código?

````js
var array = [1, 2, 3];
var results = [];
for (var i = 0; i < array.length; ++i) {
  var value = (array[i] * array[i]) + 1;
  if (value % 2 === 0) {
    results.push(value);
    if (results.length === 1) {
      break;
    }
  }
}
````

Vamos a reescribir este mismo código de forma funcional

````js
var array = [1, 2, 3];
var result = _.chain(array)
 .map(square)
 .map(inc)
 .filter(isEven)
 .head(1)
 .value();

function square(i) {
  return i * i;
}

function inc(i) {
  return i + 1;
}

function isEven(i) {
  return i % 2 === 0;
}
````

Tenemos un trozo de código más compacto y legible. Además hemos creados algunas funciones como `square` o `inc` que podremos reutilizar. 

Vamos a ver cómo aplicar programación funcional a un ejemplo de la vida real.

````js
var clients = [
  {firstName: "Princess", lastName: "Hernández", balance: 50},
  {firstName: "Darth", lastName: "Vader", balance: -20},
  {firstName: "Luke", lastName: "Skywalker", balance: -30},
  {firstName: "Han", lastName: "Solo", balance: 100}
];

var result = _.chain(clients)
  .filter(function (client) {
    return client.balance < 0;
  }).map(function (client) {
    return client.firstName + " " + client.lastName;
  }).sortBy("balance")
  .value();
````

## Ejercicio: functional

Completa los test propuestos utilizando las funciones de underscore.

## Referencias
* http://stackoverflow.com/questions/3962604/is-javascript-a-functional-programming-language
* http://www.amazon.com/Functional-JavaScript-Introducing-Programming-Underscore-js/dp/1449360726/
* https://github.com/timoxley/functional-javascript-workshop
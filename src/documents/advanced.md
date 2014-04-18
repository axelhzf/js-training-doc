---
layout: default
title: Avanzado
---

Uno de los libros básico que debería leer toda persona que está aprendiendo JavaScript es ["JavaScript: The Good Parts"](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) de [Douglas Crockford](http://en.wikipedia.org/wiki/Douglas_Crockford). 

![JavaScript Good Parts](images/good-parts.jpg)

En el libro comenta que todos los lenguajes tienen buenas ideas y malas ideas, fallos de diseño que pueden hacer que el programador cometa fallos en sus programas. Es importante conocer las buenas practicas para emplearlas y así evitar posibles problemas. Mucha gente hace incapié en las malas ideas de JavaScript, considerándolo un lenguaje de juguete que no está a la altura de otros, pero no se dan cuentas de que las buenas ideas lo hacen superior a otros lenguajes en muchos aspectos.

Buenas ideas:
- Funciones de primer orden
- Tipado dinámico
- Objetos dinámicos
- Herencia por prototype

Malas ideas:
- Variables globales
- ==

## == vs ===

La principal diferencia entre el operador `==` y `===` es que el primero realiza conversión de tipos

````js
1 == 1     // true
1 === 1    // true
1 == '1'   // true
1 === '1'  // false
````

## Scope

Por defecto, el scope de las variables es global. Se definen en un objeto global, en que en el caso del navegador se llama `window`.

````js
a = 20;
console.log(a); //20
console.log(window.a); // 20
````

Si utilizamos `var` la variable se define en el ámbito de la función donde está contenido.

````js
var a = 'global';

function printLocal () {
    var a = 'local';
    console.log(a);
}

console.log(a); //global
printLocal(); //local
````

A diferencia de otros lenguajes de programación como Java, los bloques no definen un scope.

````js
function fn() {
    if(true) {
        var a = 10;
    }
    for(i = 0; i < 20; i++) {
        var b = i;
    }
    console.log(a);
    console.log(b);
}
fn();
// 10
// 19
````

Es por esto que existen personas que prefieren definir todas las variables al inicio de la función, para evitar este tipo de problemas. Yo personalmente no suelo utilizar esta practica.

````js
function fn() {
    var a, b;
    if(true) {
        a = 10;
    }
    for(i = 0; i < 20; i++) {
        b = i;
    }
    console.log(a);
    console.log(b);
}
````

Siempre debemos definir las variables utilizar `var` para evitar efectos colaterales al modificar variables global sin darnos cuenta

````js
var a = 'global';

function printLocal () {
    a = 'local';
    console.log(a);
}

console.log(a); //global
printLocal(); //local
console.log(a); //local
````

Para evitar la utilización de variables globales se suelen utilizar las 'self-invoking functions'. La forma de definirlas es

````js
(function () {
    var a = 'this is not global';
    console.log(a);
})();
````

Definiendo una función que se llama a si misma estamos consiguiendo definir un ámbito para que la variable a no esté definida en el scope global.

Es posible que cuando veas código de alguna librerías veas a que las 'self-invoking functions' le pasan parámetros, por ejemplo:

````js
(function( window, $, undefined ) {
    // code
})(window, jQuery);
````
Utilizando parámetros conseguimos varios efectos. El primero es que hemos establecido una especie de contrato donde especificamos las funciones del ámbito global que vamos a utilizar, en este caso `window` y `jQuery`. También indirectamente podemos crear alias para estas variables, por ejemplo la variable que en el ámbito global se llama `jQuery`, dentro de nuestra función la utilizaremos como `$`. El último de los parámetros personalmente no lo suelo utilizar, me parece demasiado paranoico. Consiste en que alguien puede haber sobrescrito el valor de la variable `undefined` por otro. Al no pasar un tercer parámetro cuando invocamos la función nos aseguramos de que la variable `undefined` tiene el valor `undefined`. Personalmente nunca me he topado con un caso en el que esto sea realmente necesario.

## Funciones con número de parámetros variables

Todas las función definen dos parámetros por defecto: `this` y `arguments`. `arguments` contiene todos los parámetros que se han especificado al invocar una función, permitiendo implementar funciones con número de parámetros variables.


````js
function multipleArgs () {
    console.log(arguments);
}

multipleArgs(1, 2, 3, 4);
multipleArgs(1, 2, 3, 4, 5, 6);
````

Debido a un fallo de diseño, `arguments` es una variable de tipo array, pero no es realmente un array. Tiene una property length y se pueden acceder a los elementos con [], pero no tiene todos los métodos de un array.

````js
function multipleArgs () {
    console.log(arguments[0], arguments[1]);
    console.log(arguments.length);
    console.log(arguments.slice); //undefined
}

multipleArgs(1, 2, 3, 4);
multipleArgs(1, 2, 3, 4, 5, 6);
````

Si queremos convertir la variable `arguments` a un array podemos utilizar

````js
var args = Array.prototype.slice.call(arguments);
````

## First-class function

JavaScript soporta pasar como parámetros y devolver funciones.

Este es el modo imperativo de imprimir los elementos de un array.
````js
function printElements (array) {
    for (var i = 0; i < array.length ; i++) {
        console.log(array[i]);
    }
}
printElements([1, 2, 3]);
````

Si hicieramos una implementación funcional

````js
function forEach (array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}

function print(element) {
    console.log(element);
}

forEach([1, 2, 3], print);
````

En la implementación funcional estamos abstrayendo el recorrer un array en la función `forEach`, que recibe como segundo parámetro una función que es la que llamará en cada una de las iteraciones. Entraremos más en detalle en programación funcional cuando veamos la librería Underscore.

Las funciones como parámetros son clave en la programación asíncrona. Es muy común que las funciones que realizan tareas asíncronas reciban como parámetro una función que se invocará cuando haya terminado la tarea asíncrona. A este tipo de parámetro se le llama callbacks.

````js
function delayedAlert(callback) {
    setTimeout(function () {
        alert('hello');
        callback();
    }, 2000);
    console.log('finish delayed alert');
}

delayedAlert(function () {
    console.log('callback!');
});

// finish delayed alert
// Alert
// callback!
````

Las funciones pueden devolver funciones

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
count();
````

## Closure

Las funciones pueden acceder a todas las variables de la función donde fueron definidas (excepto this y arguments).

````js
function fn() {
  var name = "js-training";
  function innerFn() {
      console.log(name);
  }
  innerFn();
}
fn();
````

Un caso más interesante es cuando la inner function tiene un ciclo de vida mayor que la función que la englobal

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
count();
````

Este es un mecanismo que permite definir variables privadas, como la variable `count`.

Esta [herramienta](http://daniellmb.github.io/JavaScript-Scope-Context-Coloring/example/scope-coloring.html) hace un resaltado de sintaxis del código en función del scope.

## What it is "this"?

El parámetro `this` es muy importante en programación orientada a objetos y su valor está determinado por el patrón de invocación utilizado.
Existen cuatro patrones de invocación distintos en javascript: Method invocation pattern, function invocation pattern, constructor invocation pattern y apply invocation pattern.

##### Method invocation pattern

````js
var myObject = {
    increment : function () {

    }
}
myObject.increment();
// this == myObject
````

##### Function Invocation Pattern

````js
function add(a, b) {
    return a + b;
}
var sum = add(3, 4); // this == global object -> window
````

##### Constructor Invocation Pattern

Javascript es un lenguaje con herencia de prototype, esto quiere decir que un objeto puede heredar properties directamente de otro objeto.
Cuando una función se invoca utilizando el prefijo new, se crea un nuevo objeto y el valor de this apuntará a ese nuevo objeto.

````js
var Quo = function (string) {
    this.status = string;
};
Quo.prototype.get_status = function (  ) {
    return this.status;
};
var myQuo = new Quo("confused");
````

##### Apply Invocation Pattern

Los métodos `apply` y `call` permite invocar una función especificandole el valor que debe tener el this. La diferencia entre las dos funciones que la primera recibe un array con los parámetros mientras que la segunda recibe un número de parámetros variables.

````js
var parameters = [3, 4];
var sum = add(3, 4);

var thisObject = {};

var sum = add.apply(thisObject, [3, 4]);
var sum = add.call(thisObject, 3, 4);
````

## Problemas con this

El principal problema con this, es no saber qué valor tiene en cada momento.

````js
function counter() {
    var count = 0;
    return function() {
        console.log(count++);
    }
}
var count = counter();
count();
count();
````

Supongamos que queremos almacenar la variable `count` en this.

````js
var counter = {
    create : function () {
        this.count = 0;
        return function() {
            console.log(this.count++);
        }
    }
}
var count = counter.create();
count();
count();
````

Este código no va a funcionar. ¿Cual es el problema? El valor del this no es el mismo en las dos funciones.
Si quisieramos hacer esto, podríamos definir una variable local que almacenara el valor del this.

````js
var counter = {
    create : function () {
        this.count = 0;
        var self = this;
        return function() {
            console.log(self.count++);
        }
    }
}
var count = counter.create();
count();
count();
````

# Ejercicios

#### Map

La función map permite manipular los elementos de un array. Se parece a la función `forEach` que vimos anteriormente, pero `map` almacena el valor de la evaluación de todas las funciones mientras itera.

````js
it("map", function () {
    var multiplyByTwo = function (a) {
        return a * 2;
    };
    expect(map([1, 2, 3], multiplyByTwo)).to.deep.equal([2, 4, 6]);
});
````

#### Curry

La función curry permite hacer una aplicación parcial de los elementos de una función.

````js
it("curry", function () {
    function add (x, y) {
        return x + y;
    }
    var inc = curry(add, 1);
    expect(inc(10)).to.equal(11);
    expect(inc(23)).to.equal(24);
});
````

#### Memoize

La función memoize permite crear una cache de las ejecuciones de una función. Cuando se invoca una función se almacena el resultado en una cache. Si la función se vuelve a llamar con los mismos parámetros, el resultado se obtiene de la cache en lugar de evaluar de nuevo la función.

````js
it("Memoize", function () {
    var multiplyByTwo = function (a) {
        return a * 2;
    };
    var multiplyByTwoSpy = sinon.spy(multiplyByTwo);
    var multiplyByTwoMemoized = memoize(multiplyByTwoSpy);

    expect(multiplyByTwoMemoized(1)).to.equal(2);
    expect(multiplyByTwoMemoized(1)).to.equal(2);

    expect(multiplyByTwoSpy.calledOnce).to.be.true;
});
````

Para este último test he utilizado la librería [Sinon.js](http://sinonjs.org/docs/) para poder contar cuentas veces se ha llamado una función.

# Solución

````js
function map (array, fn) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(fn(array[i]));
    }
    return result;
}

function curry (fn) {
    var curryArguments = Array.prototype.slice.call(arguments);
    curryArguments.splice(0, 1);
    return function () {
        var currentArguments = Array.prototype.slice.call(arguments);
        return fn.apply(null, curryArguments.concat(currentArguments));
    }
}

function memoize (fn) {
    var cache = {};
    return function (param1) {
        if (cache.hasOwnProperty(param1)) {
            return cache[param1];
        }else {
            var result = fn(param1);
            cache[param1] = result;
            return result;
        }
    }
}
````

# Referencias

* https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Functions_and_function_scope/arguments
* http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742
* http://sinonjs.org/docs/
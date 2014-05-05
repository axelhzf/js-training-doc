---
layout: default
title: Sintaxis básica, Arrays, Objetos y Mocha
---

En esta sección veremos la sintaxis básica del lenguaje. Es importante que te queden claros los conceptos básicos porque son la base de todo lo que veremos más adelante.

Para ir probando los ejemplos de código puedes utilizar el script helloWorld.js que creamos en la sección anterior e ir viendo los resultados en la consola.

### Variables

````javascript
// Variable definition
var one = 1; // Numeric type
var two = 2.5; // Numeric type
var hello = "Hello"; // String type
var world = "World";
var isNiceTraining = true; //boolean type

// Update variable value
hello = "Hola";
yes = false;

````

### Commentarios

````javascript
// Single line comment
/*
  Multiline comment
*/
````

### If

````javascript
var resultado;
var n = 3;
if (n === 3) {
    resultado = 0;
} else if(n < 3) {
    resultado = -1;
} else {
    resultado = 1;
}
console.log(resultado);
````

### For

````javascript
var sum = 0;
for(var i = 0; i < 10; i++){
    sum = sum + i;
}
console.log(sum === 45);
````

### String

````javascript
var hello = "Hello";
var world = "World";
var helloWorld = hello + " " + world;

helloWorld.length;
helloWorld.substring(6, 8); //Wo
helloWorld.toUpperCase();
helloWorld.toLowerCase();
helloWorld.charAt(0); // "H"
helloWorld.indexOf("ello"); // 1
````


### Number
````javascript
var num = 5.56789;
num.toString();
num.toFixed(2); //5.57

Number.MAX_VALUE;
Number.MIN_VALUE;

Math.abs(num);
Math.ceil(num);
Math.floor(num);
Math.round(num);
Math.pow(2, 6);
Math.max(1, 2, 3, 4);
Math.min(1, 2, 3, 4);
````

### Array
````javascript
var numbers = [1, 2, 3, 4, 5];
numbers.length;

numbers[0] // 1
numbers[50] // undefined

numbers.push(6);
numbers.pop();
numbers.unshift(0);
numbers.shift();
numbers.concat([6, 7, 8]);

numbers.indexOf(2);
numbers.lastIndexOf(4);

numbers.reverse();
numbers.sort();

numbers.join(", ");

numbers.slice(1, 3); // [2, 3]

//numbers.splice(index, howManyToRemove, items, to, add);
numbers.splice(1, 2, "two", "three");

//Iterate the array
for (var i = 0; i < numbers.length; i += 1) {
    console.log(numbers[i]);
}

//Matrix
var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
matrix[2][1]    // 7

````

### Objects
````javascript
var obj = {
    one : 1, key2 : "two",
    "long-key" : "longKey"
    arr : [1, 2, 3],
    obj : {
        a : "a", b : "b"
    }
};

obj.one;
obj["one"];
obj.obj.a;

obj.one = "one";
delete obj.one;

//Iterate
for(var i in obj) {
    if (obj.hasOwnProperty(i)) {
        console.log(i, '' + obj[i]);
    }
}

````

### Expresiones regulares

````javascript
var regex = /\w+/g;
var str = "hello world";

regex.test(str); // true

str.match(regex); // ["hello", "world"];
str.search(regex); // 0
str.replace(regex, "word"); // "word word"
str.split(/\s+/); // ["hello", "world"]
````


### Funciones

````javascript

function fn() {}; 
var fn = function () {}; 

fn(); //cal a function

var sum = function (a, b) {
    return a + b;
}

````

### Excepciones

````js
throw "Error2";
throw 42;
throw true;

function UserException(message) {
  this.message = message;
  this.name = "UserException";
}

throw new UserException("InvalidMonthNo");

try {
} catch (e) {
}
````


## Introducción a mocha

Antes de hacer los ejercicios vamos a introducir Mocha. Mocha es un framework de testing que puede ejecutarse tanto en node como en el browser (opción que utilizaremos por ahora). Utilizaremos Mocha para comprobar que las soluciones a los ejercicios son correctas. Existen muchos otros frameworks como por ejemplo [QUnit](http://qunitjs.com/) o [Jasmine](http://pivotal.github.com/jasmine/).

Mocha es muy flexible y permite utilizar [varias librerias de assertions](http://visionmedia.github.io/mocha/#assertions) en nuestro caso vamos a utilizar [chai](http://chaijs.com/).

````js
├── spec
│   ├── basic_spec.js
│   ├── lib
│   │   ├── chai.js
│   │   └── mocha
│   │       ├── mocha.css
│   │       └── mocha.js
│   └── runner.html
└── src
    └── basic.js
````

La estructura básica tiene dos carpeta, una `src` donde pondremos nuestro código y otra `spec` donde escribiremos los tests. Dentro de la carpeta spec está la carpeta de librerias donde tenemos mocha y chai. El fichero `basic_spec.js` es un test y el fichero `runner.html` va a ser el encargado de ejecutar los tests. Abre el fichero runner.html con el chrome para ejecutar los tests. Cada vez que quieras volver a ejecutar los tests lo único que tienes que hacer es refrescar la página.

Una suite de test comienza con la llamada a la función `describe`. Cada uno de los test se definen llamando a la función `it`. Por ejemplo:

````js
describe('MiClass', function(){
    it('should have an amazing feature', function(){
        //assertions
    })
})
````

En los bloques describe se especifican funcionalidades y en los bloques it se especifica qué comportamiento debería tener. Los bloques describe se pueden anidar.

````js
describe('MiClass', function(){
    describe('amazing feature', function () {
        it("should works only if it's monday", function () {
            //assertions
        });
    }
})
````

Si queremos ejecutar un código antes de cada bloque `it` podemos utilizar la función `beforeEach`.

````js
describe('MiClass', function(){
    beforeEach(function () {

    })

    it("should return monday if it's monday", function () {
        //assertions
    });

    it("should return tuesday if it's tuesday", function () {
        //assertions
    });
})
````

Para definir las assertions vamos a utilizar chai. Estos son algunos de los métodos disponibles, en la [documentación](http://chaijs.com/api/bdd/) puedes consultar el resto.

````js
expect(foo).to.equal('bar');
expect('hello').to.equal('hello');
expect(foo).to.deep.equal({ bar: 'baz' });
expect('test').to.be.a('string');
expect([1,2,3]).to.include(2);
expect(true).to.be.true;
expect(undefined).to.be.undefined;
expect(fn).to.throw(Error);
````

Esto es lo básico que nos hace falta para poder empezar a testear el código que vayamos haciendo.

## Ejercicios

Los ejercicios van a consistir en una serie de tests para los que tendrás que escribir el código que hace pasar el test.

````js
describe("Basic test", function () {

    it("test1 suma los números del 1 al 100", function () {
        expect(test1()).to.equal(5050);
    });

    it("test2 suma los números pares del 1 al 100", function () {
        expect(test2()).to.equal(2550);
    });

    it("test3 función con la concatenación de dos strings en mayúsculas", function () {
        expect(test3("hello", "world")).to.equal("HELLO WORLD");
    });

    it("test4 crea un array con los números pares del 1 al 100", function () {
        var result = test4();
        expect(result.length).to.equal(50);
        expect(result[0]).to.equal(2);
        expect(result[1]).to.equal(4);
        expect(result[49]).to.equal(100);
    });

    it("test5 elimina los elementos duplicados de un array", function () {
        expect(test5(["a", "b", "a", "c", "b"])).to.deep.equal(["a", "b", "c"]);
    });

    it("test6 devuelve las claves y los valores de un objeto", function () {
        var obj = {key1 : "value1", key2 : "value2"};
        var result = test6(obj);
        expect(result.keys).to.deep.equal(["key1", "key2"]);
        expect(result.values).to.deep.equal(["value1", "value2"]);
    });

    it("test7 crea una función que comprueba si es un email valido", function () {
        expect(test7("axelhzf@gmail.com")).to.be.true;
        expect(test7("not an email")).to.be.false;
    });

});
````

## Referencias

* [JavaScript-Garden](http://bonsaiden.github.com/JavaScript-Garden/)
* [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/JavaScript/Guide/Regular_Expressions)
* [Chai](http://chaijs.com/api/bdd/)
* [Speakingjs](http://speakingjs.com/es5/)
---
layout: default
title: OOP
---

JavaScript es un lenguaje con orientación a objetos, pero no una orientación orientación a objetos tradicional, no encontraremos palabras claves como class, public, private, implements. JavaScript implementa lo que denominan Prototype-based programming, que no es más que un estilo de programación orientada en el que para conseguir la reutilización del comportamiento se clonan objetos a partir de otros objetos que sirven de prototipos. En palabras de Douglas Crockford:

> You make prototype objects, and then ... make new instances. Objects are mutable in JavaScript, so we can augment the new instances, giving them new fields and methods. These can then act as prototypes for even newer objects. We don't need classes to make lots of similar objects....Objects inherit from objects. What could be more object oriented than that?

Esto al principio puede confundir a programadores que vienen de lenguajes como Java o C++. Es importante que no intentemos programar orientado a objetos en JavaScript como lo haríamos en esos otros lenguajes. Conseguiremos mejores resultados si interiorizamos la prototype-based programming.

Con la próxima versión de JavaScript, [ES.next se añadirá soporte](http://www.2ality.com/2012/07/esnext-classes.html) para clases. De esto hablaremos más adelante en la sección sobre el futuro de JavaScript. Uno de los principales problemas que en mi opinión ha tenido JavaScript es que el sistema de clases y módulos no se estandarizara antes. Esto ha hecho que cada uno implemente sus propias librerias o incluso sus propios lenguajes (e.g. CoffeeScript) para solucionar cosas básica como la herencia.

Lo primero que nos llama la atención es que no exista una palabra reservada `class`. En lugar de eso JavaScript utiliza funciones como classes. Para definir una clase nueva lo único que debemos hacer es definir un nueva función.

````js
function Person() {}
````

Para crear una nueva instancia de esta clase utilizamos `new`.

````js
function Person() {}
var person1 = new Person();
var person2 = new Person();
````
El código de la función actua como constructor de la clase y se invocará cada vez que se cree una nueva instancia de la clase.

````js
function Person() {
    console.log("creating new person");
}
var person1 = new Person();
var person2 = new Person();
````
Para definir propiedades de la clase, al igual que en otros lenguajes, se utiliza `this`.

````js
function Person(name) {
    this.name = name;
}
var person1 = new Person("Pepe");
var person2 = new Person("Juan");

console.log(person1.name);
````

Definir métodos de la clase consiste en definir métodos como propiedades del objeto `prototype`.

````js
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log("hello, my name is " + this.name);
}


var person1 = new Person("Pepe");
var person2 = new Person("Juan");

console.log(person1.sayHello());
````

Los métodos no son más que funciones asociadas a un objeto o una clase como una propiedad de forma que cuando se invocan tienen asociado un contexto. Podemos invocar estas funciones sin contexto o incluso asociandole un contexto distinto.

````js
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log(this.name);
}

var person1 = new Person("Pepe");
var sayHi = person1.sayHello;

console.log(person1.sayHello()) // Pepe
console.log(sayHi()) //undefined
console.log(sayHi === person1.sayHello); //true
console.log(sayHi === person1.prototype.sayHello); //true

sayHi.call(person1) // Pepe
````

Para realizar herencia de clases

````js
// define the Person Class
function Person() {}

Person.prototype.walk = function(){
  alert ('I am walking!');
};
Person.prototype.sayHello = function(){
  alert ('hello');
};

function Student() { 
  Person.call(this); // Call the parent constructor
};
Student.prototype = new Person(); // inherit Person

// correct the constructor pointer because it points to Person
Student.prototype.constructor = Student;
 
// replace the sayHello method
Student.prototype.sayHello = function(){
  alert('hi, I am a student');
};

// add sayGoodBye method
Student.prototype.sayGoodBye = function(){
  alert('goodBye');
};

var student1 = new Student();
student1.sayHello();
student1.walk();
student1.sayGoodBye();

// check inheritance
alert(student1 instanceof Person); // true 
alert(student1 instanceof Student); // true
````

![Inheritance](images/inheritance.png)


El código que hemos visto hasta ahora no nos permite definir variables ni métodos privados. En JavaScript existen convenciones que utilizan algunos programadores como añadir como prefijo "_" para definir variables o métodos privados. En ningún caso estamos restringiendo el acceso a esos atributos, simplemente es una forma de avisar al usuarios de la clase que si modifica atributos privados la clase puede que no se comporte correctamente. En el caso de que si queramos definir variables privadas podemos utilizar el `Module Pattern`. En esta web http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript podemos ver algunas variaciones del patrón. Pero básicamente consiste en aprovechar las closures para definir ámbito privado.

````js
var basketModule = (function () {
 
  // privates 
  var basket = [];
 
  function doSomethingPrivate() {
    //...
  }
 
  function doSomethingElsePrivate() {
    //...
  }
 
  // Return an object exposed to the public
  return {
 
    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },
 
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
 
    // Public alias to a  private function
    doSomething: doSomethingPrivate,
 
    // Get the total value of items in the basket
    getTotal: function () { 
      var q = this.getItemCount();
      var p = 0;
 
      while (q--) {
        p += basket[q].price;
      }
 
      return p;
    }
  };
})();
````


Ejercicios

Crea una clase Persona, con atributos `nombre` y `apellido` que tenga un método `nombreCompleto`

````js
it("Person", function () {
  var person = new Person("Troy", "McClure");
  expect(person.fullName()).to.equal("Troy McClure");
});
````


Un mixin es patrón que permite agrupar un grupo de funcionalidades en una clase y que sean reautilizadas por varias. Podemos entender un mixin como una interfaz con métodos implementados. Para el ejercicio vamos a crear unos mixins para tratar con listas, página y ordenación.

````js
  it("Mixins", function () {
    var postItems = [
      {id: 3, name: "Why JS is better than Java?"},
      {id: 2, name: "TDD in JavaScript"},
      {id: 0, name: "How to become a JS guru"},
      {id: 1, name: "Who is using JS in production?"}
    ];
    var posts = new PostList(postItems);

    extend(PostList.prototype, paginationMixin);
    extend(PostList.prototype, sortMixin);

    posts.sortBy("id");
    expect(posts.page(1)).to.eql([
      {id: 2, name: "TDD in JavaScript"},
      {id: 3, name: "Why JS is better than Java?"}
    ]);

  });
````




Referencias:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
* http://addyosmani.com/resources/essentialjsdesignpatterns/book/
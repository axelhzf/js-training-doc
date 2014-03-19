---
layout: default
title: Ninja
---

# Ninja

## Jquery introduction

jQuery, which has risen in prominence to be the most ubiquitous JavaScript library in modern use.

jQuery (http://jquery.com) was created by John Resig and released in January of 2006. jQuery popularized the use of CSS selectors to match DOM content. Among its many capabilities, it provides DOM manipulation, Ajax, event handling, and anima- tion functionality.
This library has come to dominate the JavaScript library market, being used on hundreds of thousands of websites, and interacted with by millions of users. Through considerable use and feedback, this library has been refined over the years—and con- tinues to evolve—into the optimal code base that it is today.


## Understanding the javascript language

JavaScript consists of a close relationship
between objects, functions, and closures 

Objects <-> Closure <-> Function <-> Objects

Many JavaScript developers, especially those com-
ing from an object-oriented background, may pay a
lot of attention to objects, but at the expense of understanding how functions and clo- sures contribute to the big picture.


## How to use chrome developer tools

# History
TIP For more information on how JavaScript got its name, see http://en .wikipedia.org/wiki/JavaScript#History, http://web.archive.org/web/200709 16144913/http://wp.netscape.com/newsref/pr/newsrelease67.html, and http:// stackoverflow.com/questions/2018731/why-is-javascript-called-javascript-since-it- has-nothing-to-do-with-java. If you follow these links, they indicate that the intent was to identify JavaScript as a complement to Java, rather than something that shared its characteristics.

# Functions

the main difference between writing Java- Script code like the average Joe (or Jill) and writing it like a JavaScript ninja is understanding JavaScript as a functional language.

unctions are first-class objects; that is, they coexist with, and can be treated like, any other JavaScript object.


We’re willing to bet that nine times out of ten (or perhaps even more), this is a direct consequence of someone trying to use JavaScript as if it were another language that the lamenter is more familiar with, and that they’re frustrated by the fact that it’s not that other language

Browser event loop

* Set up the user interface
* Enter a loop waiting for events to occur
* Invoke handlers (also called listeners) for those events


Asynchronous.
The following types of events can occur, among others:
* Browser events, such as when a page is finished loading or when it’s to be unloaded
* Network events, such as responses to an Ajax request
* User events, such as mouse clicks, mouse moves, or keypresses
* Timer events, such as when a timeout expires or an interval fires

It’s important to note that the browser event loop is single-threaded. Every event that’s placed into the event queue is handled in the order that it’s placed onto the queue.



Whenever we set up a function to be called at a later time, whether by the browser or other code, we’re setting up what is termed a **callback**.

``` java
Arrays.sort(values,new Comparator<Integer>(){
  public int compare(Integer value1, Integer value2) {
    return value2 - value1;
  }
});
```
var values = [ 213, 16, 2058, 54, 10, 1965, 57, 9 ];
values.sort(function(value1,value2){ return value2 - value1; }); 


# Good Parts
No es necesario aprender cada una de las características de un lenguaje. La mayor parte de lenguajes de programación tienen partes buenas y partes malas. Es mejor utilizar únicamente las partes buenas y evitar las malas.

When Java™ applets failed, JavaScript became the "Language of the Web" by default. JS tiene unas buenas partes maravillosas.

## Why javascript
Its association with the browser makes it one of the most popular programming languages in the world

If you are good in SOME OTHER LANGUAGE and you have to program in an environment that only supports JavaScript, then you are forced to use JavaScript, and that is annoying. Most people in that situation don't even bother to learn JavaScript first, and then they are surprised when JavaScript turns out to have significant differences from the SOME OTHER LANGUAGE

## Analyzing Javascript
Good ideas:
- Functions
- Loose typing
- Dynamic objects
- Expressive object literal notation

Bad ideas:
- Global variables

### Debate entre lenguajes estáticos y dinámicos

The fashion in most programming languages today demands strong typing. The theory is that strong typing allows a compiler to detect a large class of errors at compile time. The sooner we can detect and repair errors, the less they cost us.
And I have found in my work that the sorts of errors that strong type checking finds are not the errors I worry about

### JSON
JavaScript has a very powerful object literal notation. Objects can be created simply by listing their components. This notation was the inspiration for JSON

## Prototype
A controversial feature in JavaScript is prototypal inheritance. JavaScript has a class-free object system in which objects inherit properties directly from other objects. This is really powerful, but it is unfamiliar to classically trained programmers.If you attempt to apply classical design patterns directly to JavaScript, you will be frustrated. But if you learn to work with JavaScript's prototypal nature, your efforts will be rewarded.

## Numbers
javascript tiene una única representación para números. 64 bits floating point, lo mismo que java double. No hay diferencia entre 1 y 1.0

## String
JavaScript was built at a time when Unicode was a 16-bit character set, so all characters in JavaScript are 16 bits wide.

.length
+
===
.toUpperCase

## Statements
var

## Object literals

```javascript
var empty_object = {};

var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

stooge["first-name"]     // "Joe"
flight.departure.IATA    // "SYD"

flight.status            // undefined

var status = flight.status || "unknown";

stooge.nickname = 'Curly';
```

## Prototype

Every object is linked to a prototype object from which it can inherit properties. All objects created from object literals are linked to Object.prototype, an object that comes standard with JavaScript.

if (typeof Object.beget !== 'function') {
     Object.beget = function (o) {
         var F = function () {};
         F.prototype = o;
         return new F();
     };
}

If we try to retrieve a property value from an object, and if the object lacks the property name, then JavaScript attempts to retrieve the property value from the prototype object. And if that object is lacking the property, then it goes to its prototype, and so on until the process finally bottoms out with Object.prototype

## Reflection

typeof flight.number      // 'number'
typeof flight.status      // 'string'
typeof flight.arrival     // 'object'
typeof flight.manifest    // 'undefined'
typeof flight.toString    // 'function'
typeof flight.constructor // 'function'

Comprueba si un método tiene una propiedad sin buscar en la cadena de prototype
flight.hasOwnProperty('number') 

## Enumeration

var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        document.writeln(name + ': ' + another_stooge[name]);
    }
}

## Delete
another_stooge.nickname    // 'Moe'
delete another_stooge.nickname;
another_stooge.nickname    // 'Curly' que viene del prototype

## Namespace

var MYAPP = {};
MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

## Functions
Functions in JavaScript are objects

Function objects are linked to Function.prototype (which is itself linked to Object.prototype). Every function is also created with two additional hidden properties: the function's context and the code that implements the function's behavior

var add = function (a, b) {
    return a + b;
};

Invocations

In addition to the declared parameters, every function receives two additional parameters: this and arguments

The this parameter is very important in object oriented programming, and its value is determined by the invocation pattern

There are four patterns of invocation in JavaScript: the method invocation pattern, the function invocation pattern, the constructor invocation pattern, and the apply invocation pattern. The patterns differ in how the bonus parameter this is initialized.

### Method invocation pattern
var myObject = {
    increment : function () {
  }
}
myObject.increment();

// this == myObject

### Function Invocation Pattern

var sum = add(3, 4);

// this == global object -> window

This was a mistake in the design of the language

Convention, that or self

### Constructor Invocation Pattern

JavaScript is a prototypal inheritance language. That means that objects can inherit properties. 
That means that objects can inherit properties directly from other objects. The language is class-free.

If a function is invoked with the new prefix, then a new object will be created with a hidden link to the value of the function's prototype member, and this will be bound to that new object.

var Quo = function (string) {
    this.status = string;
};
Quo.prototype.get_status = function (  ) {
    return this.status;
};
var myQuo = new Quo("confused");

Functions that are intended to be used with the new prefix are called constructors. By convention, they are kept in variables with a capitalized name.

### Apply Invocation Pattern

The apply method lets us construct an array of arguments to use to invoke a function. It also lets us choose the value of this

var parameters = [3, 4];
var sum = add.apply(null, parameters);
Quo.prototype.get_status.apply(statusObject, parameters)

# Arguments

 It gives the function access to all of the arguments that were supplied with the invocation, including excess arguments that were not assigned to parameters. This makes it possible to write functions that take an unspecified number of parameters.

Because of a design error, arguments is not really an array. It is an array-like object. arguments has a length property, but it lacks all of the array methods.

# Return
A function always returns a value. If the return value is not specified, then undefined is returned.
If the function was invoked with the new prefix and the return value is not an object, then this (the new object) is returned instead.

# Exceptions

```js
throw {
    name: 'TypeError',
    message: 'add needs numbers'
    }

try {
    add("seven");
} catch (e) {
    document.writeln(e.name + ': ' + e.message);
}
```


# Augmenting Types

Object.prototype.method = …

# Scope

Controls the visibility and lifetimes of variables and parameters. Reduce naming collisions and provides automatic memory management.

Most languages with C syntax have block scope. All variables defined in a block

Unfortunately, JavaScript does not have block scope even though its block syntax suggests that it does. This confusion can be a source of errors.

JavaScript does have function scope. 

# Closure

The good news about scope is that inner functions get access to the parameters and variables of the functions they are defined within (with the exception of this and arguments).

A more interesting case is when the inner function has a longer lifetime

Variables privadas

## Callbacks

Functions can make it easier to deal with discontinuous events

código sincrono
```js
request = prepare_the_request(  );
response = send_request_synchronously(request);
display(response);
```

código asíncrono
```js
request = prepare_the_request(  );
send_request_asynchronously(request, function (response) {
        display(response);
    });
``

## Module

We can use functions and closure to make modules. A module is a function or object that presents an interface but that hides its state and implementation. By using functions to produce modules, we can almost completely eliminate our use of global variables, thereby mitigating one of JavaScript's worst features.

```js
var Serial = function (  ) {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function (  ) {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    };
}(  );
```

## Cascade

No return value, use this instead

```javascript
getElement('myBoxDiv').
    move(350, 150).
    width(100).
    height(100).
    color('red').
```

## Curry

Crear una nueva función a partir de otra fijando algún parámetro

```javascript
Function.method('curry', function (  ) {
    var args = arguments, that = this;
    return function (  ) {
        return that.apply(null, args.concat(arguments));
    };
});    // Something isn't right...
```

```javascript
Function.method('curry', function (  ) {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function (  ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});
```

## Memoization

Functions can use objects to remember the results of previous operations, making it possible to avoid unnecessary work. This optimization is called memoization.


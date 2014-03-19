---
layout: default
title: DOM
---

# ¿Qué es el DOM?

El DOM (Document Object Model) es una API para trabajar con documentos HTML. Provee una representación de la estructura del documento permitiendo modificarlo. El DOM también provee una interfaz que permite capturar los eventos que se producen por la interacción del usuario con el navegador.

````html
<html>
<body>
    <h1>title</h1>
    <p>
        <strong>Text</strong>
    </p>
</body>
</html>
````

````html
└── html
    └── body
        ├── h1
        │   └── title
        └── p
            └── strong
                └── text
````


### Buscando elementos

Existen varias funciones que permite buscar elementos en el DOM.

````html
<div id="message">Hello World</div>
<ul>
    <li>One</li>
    <li>Two</li>
</ul>
<div class="important">Important!</div>
````

````js
var node = document.getElementById("message");
var nodes = document.getElementsByTagName("li");
var queryNodes = document.querySelectorAll(".important");
````

### Atributos de un nodo

````html
<div id="message">Hello World</div>
<ul class="list">
    <li>One</li>
    <li>Two</li>
</ul>
<div class="important">Important!</div>
````

````js
var node = document.getElementById("message");
var ulNode = document.querySelectorAll("ul")[0];

node.nodeName;     // DIV
node.textContent;  // Hello World
node.parentNode;   // body
ulNode.children;     // [<li>One</li>, <li>Two</li>]
ulNode.attributes;
ulNode.attributes.class.nodeValue; // list
ulNode.innerHtml;
````

### Manipulando el DOM

````html
<ul id="list">
    <li>One</li>
    <li>Two</li>
</ul>
````

````js
var list = document.getElementById("list");

var item = document.createElement("li");
var text = document.createTextNode("Three");
item.appendChild(text);

list.appendChild(item);
list.insertBefore(item, list.children[1]);

list.innerHTML = list.innerHTML + "<li>Four</li>";

list.removeChild(item);
````

### Event Handlers

Los eventos permiten capturar la interacción del usuario con el navegador

````html
<div id="container">
    <button id="btn">Click Me</button>
</div>
````

````js
var btn = document.getElementById("btn");
btn.addEventListener("click", function (event) {
    console.log("button clicked!");
});
````

Aquí tienes una [lista con los eventos disponibles](https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference).

En el parámetro del callback tenemos información del evento, por ejemplo `event.target` es una referencia al elemento que lanzó el evento.

Supongamos que capturamos el evento click en un enlace y no queremos que el navegador nos rediriga a la url del enlace. Podemos deshabilitar el comportamiento por defecto con la función `event.preventDefault()`.

# Ejercicio

Vamos a implementar una sencilla lista de TODOs.
El código HTML es este:

````html
<h1>TODO LIST</h1>

<ul id="list"></ul>

<form>
    <input id="todoInput">
    <input type="submit" value="Add" id="addBtn">
</form>
````

El ejercicio consiste en añadirle el funcionamiento:

* Cuando el usuario pulse el botón Add se añadirá un elemento a la lista con el contenido del input.
* Cuando el usuario pulse el botón Add se borrar el contenido del input.
* Los elementos de la lista son enlaces. Al pulsar el enlace se borra el elemento de la lista.


# Solución

````js
var addBtn = document.getElementById("addBtn");
var list = document.getElementById("list");
var todoInput = document.getElementById("todoInput");

addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var item = document.createElement("li");
    var a = document.createElement('a');
    a.href = "#";
    a.appendChild(document.createTextNode(todoInput.value));
    item.appendChild(a);
    list.appendChild(item);

    todoInput.value = "";
});

list.addEventListener("click", function (e) {
    e.preventDefault();
    list.removeChild(e.target.parentNode);
});
````

# Referencias
* https://developer.mozilla.org/en-US/docs/DOM/Mozilla_event_reference
* https://developer.mozilla.org/en-US/docs/DOM/Document.querySelectorAll
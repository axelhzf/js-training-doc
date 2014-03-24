---
title: Angular.js
---

# Angular.js

## Qué es angular

En la web de angular se definen asi.

> AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you currently have to write. And it all happens within the browser, making it an ideal partner with any server technology.


## Características

* Data binding, as in {{}}
* DOM control structures for repeating/hiding DOM fragments.
* Support for forms and form validation.
* Attaching code-behind to DOM elements.
* Grouping of HTML into reusable components.

## Getting started

Una de las principales ventajas de Angular es que es un sencillo empezar. Como por ejemplo con uno de los ejemplos que aparece en la web de angular

```html
<!doctype html>
<html ng-app>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.3/angular.min.js"></script>
  </head>
  <body>
    <div>
      <label>Name:</label>
      <input type="text" ng-model="yourName" placeholder="Enter a name here">
      <hr>
      <h1>Hello {{yourName}}!</h1>
    </div>
  </body>
</html>
```

En este ejemplo parece que no hay nada de JavaScript, únicamente tags html. Si nos fijamos en detalle, vemos algunos atributos que no pertenecen al standard html como `ng-app` que define el elemento raiz de la aplicación. También tenemos un ejemplo de databinding utilizando `ng-model` que permite hacer un binding bidireccional entre el input y una property definida en el scope. Esa misma property es la que estamos mostrando con la interpolación de variables `{{}}`. El binding funciona directamente sin que tengamos que escribir nada de código JavaScript


# Bindings

Data-binding es el mecanismo de sincronización automática de datos entre los modelos y las vistas. Angular lo implementa de forma automática, así que a diferencia de Backbone no nos tendremos que preocupar de buscar el momento adecuado para renderizar las vistas. El binding en angular es bidireccional. Cualquier cambio en la vista se refleja inmediatamente en el modelo y cualquier cambio en el modelo se refleja inmediatamente en la vista.

![One way binding](images/ng-binding-one.png)

![Two way binding](images/ng-binding-one.png)


```html
  <div ng-app>
    <input type="number" ng-model="a">
    <input type="number" ng-model="b">
    
    <div>{{a + b}}</div>
  </div>
```

http://jsbin.com/jaxuteto/1/

# Controllers

Los controladores en angular son constructores que se utilizan para aumentar el scope. Cuando un controlador se asocia al DOM a través de la directiva `ng-controller` Angular va a instanciar un nueva instancia de ese controlador. El scope estará disponible dentro de la función en el parámetro `$scope`.

Los controladores se utilizan para establecer el estado inicial del $scope y para añadir comportamiento.

```html
<div ng-app="myapp">
  <div ng-controller="HelloController">
    <div>{{message}} {{counter}}</div>
    <button ng-click="increment()">Increment</button>
  </div>
</div>  
```

```js
var app = angular.module("myapp", []);

app.controller("HelloController", function ($scope) {
  $scope.message= "Hola";
  $scope.counter = 0;
  
  $scope.increment = function () {
    $scope.counter++;
  }
})
```

http://jsbin.com/fihageki/2/edit


En los controladores no tenemos acceso a modificar el DOM, únicamente trabajaremos con los datos que hay en el scope. Lo recomendable es mantener el código de nuestos controladores lo más pequeño posible y extraer toda la lógica que sea posible a servicios para poder reutilizarla en varias vistas.

# Compartir datos entre controladores

Para compartir datos entre distintos controladores vamos a utilizar servicios. Los servicios no son más que una forma de poder definir singletons dentro del contexto de nuestra aplicación. De forma que podamos utilizarlo dentro de los controladores utilizando inyección de dependencias.

```html
  <div ng-app="app">
    <div ng-controller="Controller1">
      {{dataService.message}}
    </div>
    
    <div ng-controller="Controller2">
      <input type="text" ng-model="dataService.message">
    </div>  
```    

```js
var app = angular.module("app", []);

app.factory("dataService", function () {
  
  var dataService = {
    message : "hello world"
  };
  
  return dataService;
});


app.controller("Controller1", function ($scope, dataService) {
  $scope.dataService = dataService;
});

app.controller("Controller2", function ($scope, dataService) {
  $scope.dataService = dataService;  
});
```

http://jsbin.com/bobipami/1/edit

En la [documentación de angular](http://docs.angularjs.org/guide/providers) hay más información acerca de los distintos tipos de providers.

# Filters

Los filtros se utilizan para darle formato a un valor a la hora de mostrarselo a el usuario. Se pueden utilizar en plantillas controladores o servicios.

```html
  <div ng-app="app" ng-controller="MainController">
    {{message | reverse}}
    <input type="text" ng-model="message">
  </div>
```

```js
var app = angular.module("app", []);

app.filter("reverse", function () {
  return function (text) {
    return text.split("").reverse().join("");
  };
});

app.controller("MainController", function ($scope) {
  $scope.message = "Hola";
});
```

http://jsbin.com/baxicaki/1/edit

Angular viene con algunos [filtros ya definidos](http://docs.angularjs.org/api/ng/filter).

# Directives

Las directivas son una de las partes más importantes de angular y es lo que nos va a permitir crear componentes reutilizables que podremos reutilizar a lo largo de la aplicación. Entender las directivas es algo clave para poder sacarle todo el potencial a angular. Las directivas son marcas en elementos del DOM (atributos, elementos o classes CSS) que le indican al compilador de html de angular que tiene añadir comportamiento en ese elemento o incluso que debe transformar ese elemento y sus hijos en otro.

Existen varias formas de utilizar directivas desde las plantillas html.

```html
<my-dir></my-dir>
<span my-dir="exp"></span>
<!-- directive: my-dir exp -->
<span class="my-dir: exp;"></span>
```

Se recomienda utilizar las dos primeras formas.

Hay casos en los que el proceso de compilación de las directivas todavía no ha hecho su trabajo pero el html ya se ha renderizado.

```html
<a href="img/{{username}}.jpg">Hello {{username}}!</a>
```

Para evitar que el usuario pueda hacer click en un enlace incorrecto es preferible utilizar la directiva `ng-href` de esta forma, únicamente cuando se haya compilado, estará disponible el enlace.

```html
<a ng-href="img/{{username}}.jpg">Hello {{username}}!</a>
```

El procesador de SVG es más estricto que el de HTML y lanza errores cuando encuentra valores que no considera correctos.

```html
<svg>
  <circle cx="{{cx}}"></circle>
</svg>
```

Es un problema similar al anterior. En este caso podemos utilizar la directiva más genérica `ng-attr` que permite definir el valor a cualquier atributo.

```html
<svg>
  <circle ng-attr-cx="{{cx}}"></circle>
</svg>
```

Las directivas se definen de una manera similar a los controladores. Para registrar una directiva se utiliza `module.directive` y definiendo una factory function. Esta función se va a invocar la primera vez que se encuentra un uso de la directiva. A la hora de nombrar las directicas es recomendable utilizar algúnt tipo de prefijo, por ejemplo, si estamos definiendo una directiva para representar un carousel deberíamos llamarla algo tipo `btfCarousel` en lugar de `carousel`.

Las directivas definen plantillas que pueden ser tanto inline (`template`, como ficheros externos (`templateUrl`).

```html
<div ng-app="app">
  <hello-world></hello-world>
</div>
```  

```js
var app = angular.module("app", []);

app.directive("helloWorld", function () {
  return {
    restrict : "E",
    template : "<h1>Hola Mundo</h1>"
  };
});
```

http://jsbin.com/qiwon/1/edit

En este ejemplo estamos definiendo la directiva `helloWorld`. En la definición de la directiva, el campo `restrict` nos indica cómo vamos a poder utilizar la directiva, en este caso `E` que hace referencia a que vamos a poder utilizara la directiva como un elemento. Los valores posibles son:

* `A` - Attribute name (Default)
* `E` - Elements
* `C` - Class name
* `M` - Comentarios

Los valores se pueden combinar de forma que podríamos utilizar un valor tipo `AEC`. ¿Cuando deberíamos utilizar cada uno de los valores? En el caso de que estemos creando componentes nuevos, deberíamos utilizar `E`. En el caso de que estemos decorando de alguna forma elementos que ya existen, deberíamos utilizar `A`.

Por defectos las directivas tienen acceso a las variables definidas en el scope donde están contenidas.


```html
  <div ng-app="app" ng-controller="MainController">
    <hello-world></hello-world>
  </div>
```

```js
var app = angular.module("app", []);

app.controller("MainController", function ($scope) {
  $scope.name = "Axel";
});


app.directive("helloWorld", function () {
  return {
    restrict : "E",
    template : "<h1>Hola {{name}}</h1>"
  };
});
```

http://jsbin.com/leted/1/edit

Depender de variables ya definidas en el scope puede llevar a errores. Además el nombre de la variable debe coincidir exactamente en todos los scopes donde vamos a utilizar la directiva. Es algo que no parece muy buena idea. Las directivas pueden definir su propio **isolate scope**.


```html
<div ng-app="app" ng-controller="MainController">
  <hello-world name="user.name"></hello-world>
</div>
```

```js
var app = angular.module("app", []);

app.controller("MainController", function ($scope) {
  $scope.user = {
    name : "Axel"
  };
});


app.directive("helloWorld", function () {
  return {
    restrict : "E",
    scope : {
      name : "="
    },
    template : "<h1>Hola {{name}}</h1>"
  };
});
```

http://jsbin.com/leted/2/edit


En el objeto scope de define una property por cada uno de los atributos en los que la directiva a a poder hacer binding. Si queremos que el nombre sea distinto al utilizar la directiva que internamente, podemos utilizar

```js
scope : {
  customerInfo: "=info"
}
```

En este caso el valor del atributo será info, pero internamente, el valor de la variable dentro del scope será customerInfo. Existen varias estrategias a la hora de hacer el binding entre las variables definidas en el scope:

* **@** - Se copia el valor del atributo como un string
* **=** - Binding bidireccional
* **&** - Pasar una función del scope padre para que se llame mas adelante

Las directivas son los únicos componentes que tienen acceso al DOM. Para ello se utiliza la función `link`.


```html
  <div ng-app="app">    
      <h1 rotate>Mensaje</h1>
  </div>
```

```js
var app = angular.module("app", []);


app.directive("rotate", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      $({deg: 0}).animate({deg: 200}, {
          duration: 2000,
          step: function (now) {
            element.css({
              transform: 'rotate(' + now + 'deg)'
            });
          }
        }
      );
    }
  };
});
```

http://jsbin.com/vivew/1/edit


En este ejemplo estamos probando la directiva rotate que permite rotar un elemento. Para poder acceder al elemento del DOM sobre el que vamos a aplicar la animación utilizamos el segundo parámetro de la función link. A diferencia de Backbone, Angular no tiene como dependencia jQuery. Tiene una implementación propia con la funcionalidades básicas de jQuery que se llama jqLite. El parámetro elemento es un objeto de tipo jqLite. Angular también es capaz de funcionar con jQuery, de forma que si encuentra que jQuery está cargado, el objeto element sera un objeto jQuery. 

En el caso de que nuestras directivas necesiten algo de código cuando el elemento del DOM se elimina, por ejemplo si necesitamos desvincular algunos eventos o necesitamos eliminar algunos timmers, debemos escuchar el evento `$destroy`.

```
element.on('$destroy', ...)
```

Las directivas pueden envolver a otros elementos utilizando la opción `transclude`. Dentro de la plantilla de la directiva, se utiliza `ng-transclude` para incluir el contenido que está envuelto por el tag.


```html
<h1>Hello world</h1>
<modal>
  Hello from modal
</modal>


<script type="text/ng-template" id="modal.html">
  <div class="modal" >
    <div ng-transclude></div>
    <button ng-click="close()">Close</button>
  </div>
</script>
```

```js
app.directive("modal", function () {
  return {
    restrict: "E",
    templateUrl : "modal.html",
    transclude : true,
    link: function (scope, element, attrs) {
      scope.close = function () {
        element.hide();
      };
    }
  };
});
```

El contenido dentro de la directiva (sobre lo que hace transclude) tiene el scope del padre. Por tanto dentro del modal podríamos acceder a variables definidas en el controlador, pero no a variables definidas dentro de la directiva.


Hay situaciones en las que cuando se combinan directivas es interesante que se puedan comunicar entre ellas. Para ello se utiliza `require` que va a permitir inyectar el controlador de la directiva padre.

```html
<accordion>
    <accordion-item title="A">AAAAAAA</accordion-item>
    <accordion-item title="B">BBBBBBB</accordion-item>
    <accordion-item title="C">CCCCCCC</accordion-item>
</accordion>

<script type="text/ng-template" id="accordion.html">
    <div class="carousel" ng-transclude></div>
</script>

<script type="text/ng-template" id="accordion-item.html">
    <div class="carousel-item">
        <div class="title" ng-click="select()">{{title}}</div>
        <div ng-if="active">
            <div ng-transclude></div>
        </div>
    </div>
</script>
```

```js
var app = angular.module("app", []);

app.directive("accordion", function () {
    return {
        restrict: "E",
        templateUrl: "accordion.html",
        transclude: true,
        controller: function ($scope) {
            var self = this;
            $scope.items = [];
            this.addItem = function (item) {
                $scope.items.push(item);
                self.select(item);
            };
            this.select = function (selectedItem) {
                $scope.items.forEach(function (item) {
                    item.active = selectedItem === item;
                });
            }
        },
        link: function (scope, element, attrs) {

        }
    };
});

app.directive("accordionItem", function () {
    return {
        restrict: "E",
        templateUrl: "accordion-item.html",
        transclude: true,
        require: '^accordion',
        scope : {
            title : "@"
        },
        link: function (scope, element, attrs, carouselController) {
            carouselController.addItem(scope);
            scope.select = function () {
                carouselController.select(scope);
            }
        }
    }
});
```

http://jsbin.com/hiwuv/3/edit

## Router

El router de angular es un modulo separado `ngRoute`. Para instalarlo podemos utilizar bower. Para cargar el módulo en la aplicación es necesario declarar la dependencia 

```js
angular.module('app', ['ngRoute']);
```

La vista que configura el router se renderiza con el tag `ng-view`.

```html
<div ng-view></div>

<script type="text/ng-template" id="a.html">
    A {{id}}
    <a ng-href="#b">Go to B</a>
</script>

<script type="text/ng-template" id="b.html">
    B
    <a ng-href="#a/1">Go to A</a>
</script>
```

```js
var app = angular.module("app", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/a/:id', {
        templateUrl: 'a.html',
        controller: 'AController'
    }).when('/b', {
        templateUrl: 'b.html',
        controller: 'BController'
    }).otherwise({
        redirectTo: '/a/1'
    });
});

app.controller("AController", function ($scope, $routeParams) {
    $scope.id = $routeParams.id;
});

app.controller("BController", function ($scope) {

});
```

Con `$routeParams` podemos acceder a las variables de la ruta.

## $watch, $apply

En el scope podemos encontrar los métodos `$watch` y `$apply`.

El método `$watch` sirve para observar cambios en atributos del scope.

```html
<div ng-app="app" ng-controller="MainController">
  <input type="text" ng-model="value">
</div> 
``` 

```js
var app = angular.module("app", []);

app.controller("MainController", function ($scope) {
  $scope.$watch("value", function (newValue, oldValue) {
    console.log("change", newValue, oldValue);
  });
});
```

http://jsbin.com/volab/1/edit?html,js,output

El método $apply es el que nos permite propagar los cambios que se produzcan fuera de elementos angular (controladores, servicios o eventos manejados por angular). Como he visto, angular trabaja directamente con objetos planos a diferencia de backbone, que trabaja con getter y setters. Es por eso que angular necesita algún mecanimos para detectar los cambios que se producen en los datos. Este mecanismo se llama dirty-checking y consiste en hacer comprobaciones de los campos para averiguar si han cambiado. Siempre que realicemos los cambios dentro de un contexto de angular, no tendremos que preocuparnos de activar el ciclo dirty-checking, se hará automáticamente. Si hacemos cambios en el modelo desde otros puntos de la aplicación, tendremos que llamar al metodo `scope.$apply()` para que se propaguen los cambios.

```html
 <div ng-app="app" ng-controller="MainController">
    {{counter}}
  </div>  
```

```js
var app = angular.module("app", []);

app.controller("MainController", function ($scope) {  
  $scope.counter = 0;
  setInterval(function () {
    $scope.counter++;
    $scope.$apply();
  }, 1000);  
});
```
http://jsbin.com/nulux/1/edit?html,js,output

El método $apply es importante cuando estamos integrando código no escrito utilizando angular. Por ejemplo, cuando estamos creando una directiva para envolver un componente de jQuery.

## Ejemplo


## Recursos

* http://shop.oreilly.com/product/0636920028055.do
* http://www.thinkster.io/angularjs/GtaQ0oMGIl/a-better-way-to-learn-angularjs
* http://www.thinkster.io/angularjs/GUIDJbpIie/angularjs-tutorial-learn-to-build-modern-web-apps
* https://egghead.io/
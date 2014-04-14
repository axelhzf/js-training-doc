---
layout: default
title: jQuery
---

[jQuery](http://jquery.com/) es una librería que permite manipular el DOM, manejar eventos, crear animaciones y realizar peticiones Ajax. Todo esto funcionando en multitud de navegadores. Una de las razones por las que jQuery es tan popular es por la cantidad de plugins que tiene.

Hace un par de años hubo una batalla entre librerías que ofrecian este tipo de funcionalidades: [jQuery](http://jquery.com/), [Mootols](http://mootools.net/), [Prototype](http://prototypejs.org/). jQuery fue el claro vencedor de la batalla, siendo el más utilizado en la actualidad. Es tán utilizado que un [estudio](http://www.sitepoint.com/jquery-used-on-50-percent-of-websites/) dice que el 50% de las webs utilizan jQuery. Y lo que es más sorprendente, el 88.3% de las webs que utilizan JavaScript utilizan jQuery. Esto explica algunos memes que han aparecido como "[you should definitely use jQuery](http://www.doxdesk.com/img/updates/20091116-so-large.gif)".

La principal ventaja de utilizar jQuery es el [soporte multinavegador](http://jquery.com/browser-support/). Si estamos trabajando en una aplicación que trabaja con el DOM es conveniente utilizar jQuery porque nos ahorra muchos problemas de compatibilidad entre distintos navegadores. jQuery soporta la [mayoría de navegadores](http://jquery.com/browser-support/) incluso navegadores obsoletos como IE6. A partir de la [versión 2](http://blog.jquery.com/2013/04/18/jquery-2-0-released/) van a dejar de dar soporte a IE6, 7, 8 en un intento de hacer la librería más ligera y forzar a que la gente actualice sus navegadores para que la Web pueda evolucionar.

jQuery es una librería bastante pesada. Esto puede suponer un problemas cuando estamos trabajando para dispositivos móviles en los que la conexión puede que no sea rápida. Si esto supone un problema existen alternativas como [zepto.js](http://zeptojs.com/), una librería que con una API compatible pero más ligera.

La versión con la que vamos a trabajar en el curso es la 1.9.1. Para incluir la librería en la web podemos utilizar utilizando un CDN, por ejemplo el de google, o directamente utilizando una versión local.

````html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="/libs/jquery.min.js"></script>
````
En el caso de utilizar una versión local, es recomendable utilizar un gestor de paquetes, como por ejemplo [bower](http://twitter.github.io/bower/).

# $

Todos los métodos de jQuery están expuestos a través del objeto `jQuery`. Este objeto a su vez tiene un alias con `$`. Esto es un claro ejemplo del uso del patrón [Facade](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript).

````js
// Código equivalente
jQuery('.title h1');
$('.title h1');
````

Existen otras librerías como Mootols que también utilizan `$` para encapsular sus métodos. Mezclar estas dos librerías no es una muy buena idea, pero hay veces en las que es inevitable. En esos casos es necesario utilizar la función `noConflict`.

````html
<script src="other$lib.js"></script>
<script src="jquery.js"></script>
<script>
  $.noConflict();
  $  // $ === other lib

  jQuery('.title h1');

  (function ($) {
    $('.title h1'); // $ == jQuery
  })(jQuery);

</script>
````

El uso básico de la librería consiste en utilizar un selector para seleccionar varios elementos y luego aplicar una acción sobre los elementos seleccionados.

````js
$('#content').show();
$('.menu li').addClass("active");
````

También existen algunas funciones que no se aplican a una selección de elementos del DOM.

````js
$.get('/tweets');
````

Pasar una función como parámetro es equivalente a añadir un listener al evento document.ready.

````js
$(function () {
    // document ready code
});

//similar a
$(document).ready(function () {

});
````

El evento document.ready es importante porque no puedes modificar un elemento del DOM si todavía no se ha parseado.
Este código no va a funcionar porque el div con clase important todavía no se ha definido cuando se ejecuta el JavaScript.

````html
<script>
    $(".important").text("Important text");
</script>
<div class="importat"></div>
````

Para solucionar podemos añadir un listener al evento [document.ready](http://api.jquery.com/ready/) que se lanza cuando el DOM se ha cargado completamente. Este código si funciona.

````html
<script>
    $(function () {
        $(".important").text("Important text");
    });
</script>
<div class="importat"></div>
````

Otra solución mucho mas sencilla y eficiente hubiera sido poner el bloque de script debajo del div, para que del div.important ya estuviera definido. Esta es una de las razones por las que se recomienda colocar el código JavaScript al final de la página.

````html
<div class="importat"></div>
<script>
    $(".important").text("Important text");
</script>
````

# Selectores

jQuery utiliza la sintaxis de CSS para seleccionar elementos del DOM.

````js
$("#content");
$(".container");
$("ul li.active");
$("ul > li");
$("ul li:first-child");
````

Además de los selectores compatibles con CSS, jQuery añade algunos otros selectores

````js
$("li:eq(2)");
$("li:even");
$("li:odd");
````

[Lista completa de los selectores disponibles](http://api.jquery.com/category/selectors/).

Estos selectores trabajan en el contexto de toda la página. Podemos hacer los selectores más rápidos si reducimos el contexto.

````js
var $content = $('#content');
$('li', $content);
$content.find('li');
````

Todas las operaciones con el DOM son lentas, cuando trabajes con muchos elementos a la vez puedes empezar a notar retardos. Por eso es importante tratar de reducirlas lo máximo posible. Por ejemplo, podemos tratar de reducir el número de selector que hacemos guardando el resultado en una varaible


````js
for (var i = 0; i < 10000; i++) {
    $('#container').html(i);
}

var $container = $('#container');
for (var i = 0; i < 10000; i++) {
    $container.html(i);
}
````

Cuando tengamos dudas de rendimieneto de este tipo y queramos ver qué código es más rapido, podemos utilizar la web [jsperf](http://jsperf.com/). Por ejemplo en este jsperf se [comprueba la velocidad de cachear selectores jQuery](http://jsperf.com/caching-jquery-selectors/6).


Los selectores devuelven un objeto sobre el que podemos aplicar acciones para modificar los elementos. También podemos acceder a los elementos del DOM seleccionados.

````js
$("li").hide(); 

$("li").get(0); // DOM element at 0
$("li")[0];     // DOM element at 1
$("li").eq(1);  // jQuery object at 1
````

# Crear elementos

El objeto jQuey también permite crear elementos nuevos

````js
$('<div class="container">New Element</div>').appendTo("body");
````

http://jsbin.com/dikewo/1/

# Getters & setter

Existen funciones que actuan como getters y setters a la vez. En caso de que no le pases parámetros te devolverá el valor actual. Si le pasas un parámetro asignará ese valor.

````js
$('li').html();
$('li').html('New HTML');
````

# Chaining

jQuery permite encadenar varias llamadas a métodos sobre el mismo selector. De esta forma nos evitamos tener que definir una variable o duplicar el selector.

````js
$('a')
    .addClass("btn")
    .attr('title', 'Nice link' )
    .show();

var $a = $('a')
$a.addClass("btn")
$a.attr('title', 'Nice link' )
$a.show();
````

# Manipulación de elementos

http://api.jquery.com/category/manipulation/

````js
$("a").html("New HTML");
$("a").addClass("className");
$("a").removeClass("className");
$("a").toggleClass("className");

$("input").val()
$("a").attr("href", "http://www.google.com");
$("a").css("font-size", "20px");

$("a").appendTo()
$("a").append()
$("a").remove()
````

http://jsbin.com/qokir/2/edit

# Eventos

.on("click")
.off()
.trigger

click, keydown, keypress, keyup, mouseover, mouseenter, mouseleave, scroll, focus, blur, resize

namespaced events

$( 'li' ).on( 'click', function() {
  console.log( 'a list item was clicked' );
});

$( 'li' ).on( 'click', function() {
  registerClick();
  doSomethingElse();
});

$( 'li' ).off( 'click' );



$( 'li' ).on( 'click.logging', function() {
  console.log( 'a list item was clicked' );
});

$( 'li' ).on( 'click.analytics', function() {
  registerClick();
  doSomethingElse();
});

event object

$( document ).on( 'click', function( event ) {
  console.log( event.type );    // The event type, eg. "click"
  console.log( event.which );   // The button or key that was pressed.
  console.log( event.target );  // The originating element.
  console.log( event.pageX );   // The document mouse X coordinate.
  console.log( event.pageY );   // The document mouse Y coordinate.
});


prevent default action

event.preventDefault();

$( 'li' ).off( 'click.logging' );


Event delegation

$( '#my-unordered-list' ).on( 'click', function( event ) {
  console.log( event.target ); // logs the element that initiated the event
});

# Efectos

An important note about animations: In modern browsers, and especially on mobile devices, it is often much more efficient to achieve animations using CSS rather than JavaScript. The details of doing this are beyond the scope of this guide, but if you are only targeting mobile devices or browsers that support CSS animations, then you should use CSS for animations where possible. You may also want to consider setting jQuery.fx.off to true on low-resource devices; doing so will cause animation methods to immediately set elements to the desired state, rather than animating to that state.


.show() Show the selected elements.
.hide() Hide the selected elements.
.fadeIn() Animate the opacity of the selected elements to 100%.
.fadeOut() Animate the opacity of the selected elements to 0%.
.slideDown() Display the selected elements with a vertical sliding motion.
.slideUp() Hide the selected elements with a vertical sliding motion.
.slideToggle() Show or hide the selected elements with a vertical sliding motion, depending on whether the elements are currently visible.

$( '.hidden' ).show( 300 );

$( 'p.old' ).fadeOut( 300, function() {
  $( this ).remove();
});


# $.ajax y Defered

AJAX -- "asynchronous JavaScript and XML" — is a means of loading data from a server without requiring a page reload. It uses a browser's built-in XMLHttpRequest (XHR) functionality to make a request to the server and then handle the data that the server returns.

jQuery provides the $.ajax method — and several convenience methods — to make it easier to work with XHRs across browsers.

## JSON

$.ajax
$.get
$.post

que es un json

JSON.parse
JSON.stringify


## $.Deferred


.then
.done
.fail
.always
.when


function doSomethingLater( fn, time ) {
  var dfd = $.Deferred();

  setTimeout(function() {
    dfd.resolve( fn() );
  }, time || 0);

  return dfd.promise();
}

var promise = doSomethingLater(function() {
  console.log( 'This function will be called in 100ms' );
}, 100);


# Referencias

* http://api.jquery.com/
* http://jqfundamentals.com/
* http://twitter.github.io/bower/
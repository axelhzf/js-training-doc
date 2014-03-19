---
layout: default
title: jQuery
---

[jQuery](http://jquery.com/) es una librería que permite manipular el DOM, manejar eventos, crear animaciones y realizar peticiones Ajax. Todo esto funcionando en multitud de navegadores. jQuery también permite crear plugins

Hace un par de años hubo una batalla entre librerías que ofrecian este tipo de funcionalidades: [jQuery](http://jquery.com/), [Mootols](http://mootools.net/), [Prototype](http://prototypejs.org/). jQuery fue el claro vencedor de la batalla, siendo el más utilizado en la actualidad. Es tán utilizado que un [estudio](http://www.sitepoint.com/jquery-used-on-50-percent-of-websites/) dice que el 50% de las webs utilizan jQuery. Y lo que es más sorprendente, el 88.3% de las webs que utilizan JavaScript utilizan jQuery.

La principal ventaja de utilizar jQuery de trabajar con los métodos del DOM directamente es el [soporte multinavegador](http://jquery.com/browser-support/). Si escribimos para manipular el DOM trabajamos con los métodos que provee jQuery podemos asegurar con alta probabilidad que la aplicación será compatible con la mayoría de navegadores. Incluso con navegadores antiguos como IE6. A partir de la versión 6 van a dejar de dar soporte a IE6, 7, 8.

jQuery no es una librería ligera, sobretodo si estamos hablando de utilizarla en dispositivos móviles. jQuery no es ligera porque da soporte a muchos navegadores que quizas no nos hacen hacen falta cuando desarrollamos una aplicación móvil porque estos suelen venir equipados con webkit. Para cubrir esta necesidad surge [zepto.js](http://zeptojs.com/). Una librería que tiene una API compatible con jQuery pero mucho más ligera.

La versión con la que vamos a trabajar en el curso es la 1.9.1. La más reciente hasta el momento. Lo primeros que tenemos que hacer es incluir la librería, bien incluyendola desde un cdn o desde local.

````html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="/libs/jquery.min.js"></script>
````

Si vas a incluir la librería desde local, te recomiendo un gestor de paquetes como [bower](http://twitter.github.io/bower/). Antes del ejercicios veremos cómo utilizarla.

# $

Todos los métodos de jQuery están expuestos a través del objeto `jQuery`. Este objeto a su vez tiene un alias con `$`.

````js
    // Código equivalente
    jQuery('.title h1');
    $('.title h1');
````

Existen otras librerías como Mootols que también utilizar `$` para encapsular sus métodos. Mezclar estas dos librerías no es una muy buena idea, pero hay veces en las que es inevitable. En esos casos puedes utilizar la función `noConflict`.

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

Lo normal con jQuery es aplicar un selector para seleccionar ciertos elementos y luego ejecutar una acción sobre los elementos seleccionados.

````js
$('#content').show();
$('.menu li).addClass("active");
````

También existen algunas funciones que no se aplican a una selección de elementos del DOM.

````js
$.get('/tweets');
$.noConflict();
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

Además de los selectores compatibles con css, jQuery añade algunos otros selectores

````js
$("li:eq(2)");
$("li:even");
$("li:odd");
````

Aquí tienes la [lista completa de los selectores disponibles](http://api.jquery.com/category/selectors/).

Estos selectores trabajan en el contexto de toda la página. Podemos hacer hacer los selectores más rápidos si reducimos el contexto.

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

Los selectores devuelven un objeto jQuery sobre el que podemos aplicar acciones para modificar los elementos. También podemos acceder a los elementos del DOM seleccionados.

````js
$("li").hide();
$("li").get(0); // DOM element at 0
$("li").[1];    // DOM element at 1
$("li").eq(1);  // jQuery object at 1
````

# Crear elementos

jQuery también nos permite crear nuevos elementos del DOM.

````js
$('<div class="container">New Element</div>');
````


# Getters & setter

````js
$('li').html();
$('li').html('New HTML');

$('li').html(function (i, oldHtml) {
    return "asdf";
});
````

# Chaining

jQuery permite encadenar varias llamadas a métodos sobre el mismo selector. De esta forma nos evitamos tener que definir una variable o duplicar el selector.

````js
$('a')
    .addClass("btn)
    .attr('title', 'Nice link' )
    .show();

var $a = $('a')
$a.addClass("btn)
$a.attr('title', 'Nice link' )
$a.show();
````





## From peepcode

Jquery embrace the dom
DOM a way to access html elements at objects
html or xhtml

you call functions on elements
all elements can work in arrays or




# Referencias

* http://api.jquery.com/
* http://jqfundamentals.com/
* http://twitter.github.io/bower/
---
layout: default
title: Hello World
---

# Primeros pasos

Ya sabemos algo de historia y por qué JavaScript es tán importante en la actualidad, va siendo hora de empezar a escribir algo de código. Antes de empezar con la sintaxis básica tenemos que preparar un entorno donde poder hacer las pruebas.

## Navegadores

Lo primero que necesitamos es una forma de empezar a probar nuestro código. Lo más sencillo es crear una web y abrirla en el navegador. Durante el curso utilizaremos [Google Chrome](https://www.google.com/intl/en/chrome/browser/) para realizar las pruebas. A día de hoy tiene el motor de JavaScript más rápido y tiene unas herramientas de desarrollo muy buenas.

Cuando estas desarrollando aplicaciones web es muy importante que la aplicación se comporte correctamente en todos los navegadores. Durante años, el mayor quebradero de cabeza para los desarrolladores web ha sido dar soporte a navegadores antiguos, en especial IE6, 7, 8. En la actualidad hay un movimiento para dejar de dar soporte a navegadores antiguos que está potenciado por web importantes. Por ejemplo facebook es compatible con IE8 en adelante o youtube que es compatible con IE7 en adelante. Incluso microsoft quiere [dejar de dar soporte a IE6](http://www.ie6countdown.com/).

## Editores

Puedes utilizar el editor de texto que prefieras durante el curso, pero te recomiendo que utilices [Sublime Text](http://www.sublimetext.com/). Es un editor muy versátil que cuenta con muchos plugins.

Si buscas un IDE completo para JavaScript, te recomiendo [WebStorm](http://www.jetbrains.com/webstorm/). Permite autocompletado, depuración dentro del IDE, soporte para node.js, refactor. El único inconveniente es que es de pago, pero merece mucho la pena. Si además trabaja en el día a día con Java, te recomiendo el pack completo con [IntelliJ IDEA](http://www.jetbrains.com/idea/).

## Primer script: Hola Mundo

Crea una página html básica donde incluir el código JavasScript.

````html
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title></title>
</head>
<body>

</body>
</html>
````

Existen varias maneras de incluir código JavaScript en una página. Por ejemplo, podemos utilizar código inline utilizando el tag `script`.

````html
<script type="text/javascript">
    console.log("hello world");
</script>
````

A partir de HTML5 ya no es obligatorio especificar el atributo `type`, por lo que podemos simplicar el código a

````html
<script>
    console.log("hello world");
</script>
````

Los scripts los deberíamos incluir al final de la página, justo antes del cierre de la etiqueta `body`. La principal razón es que la página debería empezar a renderizarse lo antes posible. En este [artículo](http://robertnyman.com/2008/04/23/where-to-include-javascript-files-in-a-document/) tienes la explicación.

Otra forma de incluir código es utilizar un fichero externo:

````html
<script src="helloWorld.js">
````

````javascript
console.log("hello world");
````

Utilizar ficheros externos permite hacer el código más modular y reutilizar el código en distintas páginas. Además de esto tiene la ventaja de que los navegadores pueden cachear los scripts, reduciendo la cantidad de datos que se tienen que bajar haciendo que la página sea más rápida.

Al abrir la página en el navegador no aparece nada porque la función `console.log` escribe mensajes en la consola. Para poder ver la consola tenemos que abrir las herramientas de desarrollador `Tools/Developer Tools/Console`.
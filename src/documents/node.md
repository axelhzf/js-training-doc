---
layout: default
title: Node.js
---

# Node.js

Node.js es una plataforma software que permite utilizar JavaScript en el lado del servidor, para ello internamente utiliza la máquina virtual V8, la misma que utiliza Google Chrome. Además viene con un conjunto de módulos que nos permiten realizar tareas básicas como trabajar con ficheros, sockets o http. Por lo tanto Node.js son dos cosas, un runtime y una librería. La primera versión de Node.js se publicó en 2011 y desde entonces se ha creado una comunidad de desarrolladores muy importante que han creado un gran ecosistema para desarrollar aplicaciones. 

Las aplicaciones Node.js están pensadas para maximimar el rendimiento y la eficiencia utilizando entrada y salida no bloqueantes y eventos asíncronos. Las aplicaciones utilizan un único hilo aunque internamente se utilizan varios hilos para trabajar con ficheros o eventos de red. Dada su naturaleza asíncrona los aplicaciones son muy utilizadas para realizar aplicaciones real time. 

## Instalación

Para la instalación de node en Mac OSX o Windows puede descargar el instalador en la [página oficial](http://nodejs.org/).
En el caso de linux, debemos añadir un repositorio de donde se descargará los paquetes. Puedes seguir [estas instrucciones](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

## Hola Mundo

Crea un fichero hello.js

````js
console.log('Hello world')
````

Para ejecutar la aplicación simplemente ejecuta el comando

````sh
> node hello.js
````

Node trae integrados algunos módulos, por ejemplo el módulo `http` que nos permite trabajar con peticiones http.
Crea un fichero que se llame helloServer.js y copia este contenido

````js
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
````

````sh
> node helloServer.js
````

Para comprobar si funciona, abre en un navegador la url http://127.0.0.1:1337/

A diferencia del primer ejemplo, esta vez el programa no termina, sino que se queda a la espera de nuevas peticiones. Como comentamos en la introducción, tenemos que tener en cuenta que nuestro programa se ejecuta en un úncio hilo, pero aún así, es capaz de responder a peticiones simultaneas.

## Non-blocking I/O

Una de las razones que hizo al creador de Node.js inclinarse a utilizar JavaScript es que era un lenguaje que no contaba con una API de entrada y salida. Esto le permitió diseñar la API desde cero haciendola asíncrona por defecto, permitiendo que las aplicaicones escritas en Node.js sean muy eficientes.

La entrada y salida tradicional es algo parecido a esto

````js
var fileContent = file.read('file.txt');
// wait 
process(fileContent);
otherProcess();
````
El problema con la entrada y salida tradicional es la espera. ¿Por qué esperar a ejecutar el método `otherProcess` si no depende del contenido del fichero? Las operaciones de entrada y salida son muy costosas.


| | Latencia relativa|
| --- | --- |
| Register | 1 |
| Cache | 10 |
| Memory | 100 |
| Harddisk | 10 000 000 |

Utilizando una entrada y salida no bloqueante, el código sería

````js
file.read('file.txt', function (fileContenet) {
    process(fileContent);
});
otherProcess();
````

En este caso no hay necesidad de esperar a la lectura de disco para seguir ejecutando el código. A pesar de que el código sea asíncrono tenemos que tener en cuenta que nuestra aplicación se ejecuta en un único hilo

````js
file.read('file.txt', function () {
    // este código nunca se va a ejecutar
});

while(true) {
    // bloqueo del proceso
}
````

## CommonJS modules

CommonJS es el sistema de módulos que incorpora Node.js. Con el sistema de módulos podemos incluir otros ficheros, librerías del sistema o modulos desarrolladores por terceros.

El código para crear un módulo es muy sencillo. Únicamente tenemos que especificar qué métodos queremos exportar.

hello.js

````js
exports.world = function () {
    return 'Hello World';
};
````
main.js

````js
var hello = require('./hello');
console.log(hello.world());
````
En el caso de que queramos exportar un objeto completo, podemos utilizar

````js
module.exports = function () {
    return 'Hello World';
};
````
main.js

````js
var hello = require('./hello');
console.log(hello());
````

Para utilizar alguno de los módulos que trae Node por defecto, basta con usar require. En la [documentación](http://nodejs.org/api/) tienes el listado de módulos disponibles.

````js
var fs = require("fs");
fs.writeFile('message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
````

Node.js viene con un gestor de paquetes llamado [NPM](https://www.npmjs.org/) que nos permite gestionar librerías de terceros. El comando para instalar un paquete es

````bash
npm install nombrePaquete
````

Por ejemplo, si quisieramos instalar underscore

````bash
npm install underscore
````
Este comando se bajara el módulo con todas sus dependencias dentro de la carpeta `node_modules` y ya lo tendremos disponible para incluir desde nuestro código.

````js
var _ = require("underscore");
va result = _.map([1, 2, 3], function(num){ return num * 3; });
console.log(result);
````
Podemos definir los módulos en un fichero .json para que en todo momento sepamos qué modulos y qué versiones utiliza la aplicación. Para ello definimos un fichero `package.json`

````json
{
  "name": "myModule",
  "dependencies": {}
}
````

La proxima vez que instalemos un módulo, utilizaremos la opción `--save` para añadir la dependencies al fichero package.json en la sección dependencies.

````
npm install underscore --save
````
## Ejercicio: node-fs

Escribe una función que devuelva la lista de ficheros de un directorio junto con tamaño, ordenados por nombre.

## Callback hell

La naturaleza asíncrona de Node.js hace que trabajar con funciones asíncronas sea muy común. El uso constante de callbacks se puede complicar cuando queremos encadenar varias tareas una detras de otra y podemos terminar teniendo lo que se denomina un [Callback Hell](http://callbackhell.com/).

````js
fs.readFile('file1.txt', function (file1) {
  fs.readFile('file2.txt', function (file2) {
    fs.readFile('file3.txt', function (file3) {
      fs.readFile('file4.txt', function (file4) {
        fs.readFile('file5.txt', function (file5) {
          process(file1, file2, file3, file4, file5);
        }
      }
    }
  }
}
````

Existen varias fórmulas para este problema. La primera y la más sencilla es no abusar de las funciones anónimas.

````js
var process = function (file1, file2) {}
var readfile2 = function (cb) { fs.readFile('file2.txt', process); }
var readfile1 = function (cb) { fs.readFile('file1.txt', readfile2);}
readfile1();
````

Otra posible solución es utilizar promisas

````js
var fs = require("fs");
var path = require("path");
var _ = require("underscore");

var Promise = require('es6-promise').Promise;

function readfile(file) {
  var promise = new Promise(function (resolve, reject) {
    fs.readFile(file, function (err, content) {
      if (err) return reject(err);
      resolve(content.toString());
    })
  });
  return promise;
}


Promise
  .all([
    readfile("file1"), 
    readfile("file2"),
    readfile("file3")
  ])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });
````

Otra posible solución es utilizar la librería [async](https://github.com/caolan/async) que provee una serie de utilidades para trabajar con funciones asíncronas.

````js
async.map(['file1','file2','file3'], fs.stat, function(err, results){
    
});
````

## Ejerciocio: node-fs-async

Escribe el mismo código del ejercicio anterior utilizando la librería async

## Express

En uno de los ejemplos anteriores vimos como el módulo http nos permite crear un servidor web simple. Esta es la base para módulos como [express](http://expressjs.com/) que añaden las funcionalidades básicas de cualquier framework web.

Durante el desarrollo del material del curso, express lanzó una nueva versión, la versión 4. En el curso trabajaremos con la versión 3. En el cambio de versión hay algunas cosas que no son compatibles pero la [migración es sencilla](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x). Por lo tanto la documentación que seguiremos es la de la [versión 3.x](http://expressjs.com/3x/api.html).

Para instalar una versión concreta de un paquete lo podemos hacer especificándolo en el fichero package.json o desde la consola utilizando el comando

````
npm install express@3.5.1
````

El mismo código de hola mundo del ejemplo anterior, en express sería este código

````
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
````
Para ejecutar la aplicación, simplemente

````
node app.js
````

Express utiliza el módulo [debug](https://github.com/visionmedia/debug) internamente para hacer logging. En el caso de que queramos habilitar los logs podemos utilizar el comando

````
DEBUG=express:* node app.js
````

La arquitectura de express se basa en el concepto de middleware. Un middleware no es más que una función encargada de manejar peticiones. La aplicación configura una middleware por los que pasaran las peticiones entrantes. Los middlewares se pueden configurar de forma global o por path. El middleware más simple que podemos definir es el siguiente

````js
function uselessMiddleware(req, res, next) { 
  next();
}
````

Un middleware recibe como parámetro los objetos `req` y `res` que representan la request y la response. La función `next` indica que se ejecute el siguiente middleware dentro de la cadena. Dentro del middleware podemos manejar los objetos `req` y `res` para añadir funcionalidades. Por ejemplo, para mostrar un log por cada una de las peticiones

````js
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});
````

También podemos especificar un path como primer parámetro

````js
app.use("/admin", middleware);
````

Express utiliza internamente [connect](http://www.senchalabs.org/connect/) y expone todos sus middlewares. Por ejemplo, ya existe un [middleware](http://www.senchalabs.org/connect/logger.html) de logging como el que acabamos de crear. Para utilizarlo simplemente

````js
app.use(express.logger());
````

Las rutas se comportan de manera similar a los middleware y están asociados a los verbos http(get, post, put, delete)

````js
app.get("/", function (req, res) {
  res.send("hello world");
});
app.put(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
  
});
app.post("/post/:id", function (req, res) {
  
})
````

Las funcionalidades más básicas en un framework web son, parsear los parámetros de las peticiones y generar una respuesta

````js
app.get("/users/:name", function (req, res) {
  req.params.name // GET /users/axel
  req.query.order // GET /users/axel?order=desc
});

app.use(bodyParser());
app.post("/users", function () {
  req.body.users.name  // POST user[name]=tobi&user[email]=tobi@learnboost.com
  req.body.name // POST { "name": "tobi" }
});


req.param("") // busca en req.params, req.body, req.query

res.redirect('/foo/bar');
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('some html');
res.send(404, 'Sorry, we cannot find that!');
res.send(500, { error: 'something blew up' });
res.send(200);
res.json({user: 'tobi'})
res.jsonp({ user: 'tobi' })
res.render('index', {name : "Tobi"})
````

La ultima opción, `res.render` permite a express integrarse con sistema de plantillas. Podemos configurar el sistema de plantillas que vamos a utilizar con

````js
app.engine('jade', require('jade').__express);
````

## Ejercicio: Crea la api rest de twitter

En este ejercicio vamos a crear una API rest con funcionalidades parecidas a la de twitter.

````
GET /tweets

[
  {id:2, text: "Hi"},
  {id:1, text: "First tweet"}
]
````

````
GET /tweets/:id

{id:2, text: "Hi"}
````

````
POST /tweets

request {text: 'Hi'}
response {id: 20, text: 'Hi'}
````

````
GET /search?q=axel
[
  {id:15, {text: "axel is a good teacher"}}
]
````

Para simplificar un poco las cosas no vamos a utilizar una base de datos, sino que vamos a guardar los tweets en memoria. Para que puedas comprobar si el ejercicio está correcto cree unos tests de integración que atacan a la api directamente. Para ejecutar lo test, `npm test`.

Una vez tengas lista la aplicación, prueba a desplegarlo en [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) o [nodejitsu](https://www.nodejitsu.com/getting-started/).

## Auto reload

A diferencia de otros framework web, como podría ser rails o play. Los cambios no se recargan en caliente. Esto no supone mucho problema, la aplicación se levanta muy rápido por lo que no perdemos tiempo reiniciando el servidor. El único tiempo que podemos perder es si realizamos la tarea a mano, por eso vamos a utilizar un módulo que realiza esta tarea de forma automática.

````bash
npm install node-dev --save-dev
````

Para que el auto reload funcione tenemos que arrancar la aplicación con node-dev.

````bash
$ node-dev app.js
````

Prueba a hacer algún cambio y comprueba cómo se actualizan.

## Debugging

Depurar aplicaciones en JavaScript es bastante sencillo gracias a las herramientas de desarrollo de los navegadores. Depurar aplicaciones node no es tan sencillo.

La opción más simple para depurar aplicaciones

````js
console.log("log");
````

Ahora en serio, si queremos poner break points o inspeccionar el valor de las variables en caliente podemos utilizar un IDE como IntelliJIDEA que cuenta con [debugger integrado](http://www.jetbrains.com/idea/webhelp/running-and-debugging-node-js.html). En el caso de que estemos usando un simple editor de texto, podemos usar [node-inspector](https://github.com/node-inspector/node-inspector)

````
$ npm install -g node-inspector
$ node-debug app.js
````


## Websockets

WebSocket es un protocolo que permite comunicación bidireccional entre el cliente el servidor. Inicialmente fue pensada para la comunicación entre navegador y servidor web pero puede ser utilizado con cualquier cliente o servidor de aplicaciones. Esta es la tecnología que permite crear la web en tiempo real. El servidor podrá avisar directamente a los clientes cuando se produzcan eventos nuevos. Los navegadores modernos ya implementan este standard.

http://caniuse.com/websockets

[Socket.io](http://socket.io/#how-to-use) es una librería para construir aplicaciones en tiempo real con Node.js, Webscockets y fallbacks para los navegadores que no lo soportan. Los tispos de transporte que soporta son:

* WebSocket
* Adobe® Flash® Socket
* AJAX long polling
* AJAX multipart streaming
* Forever Iframe
* JSONP Polling

Ejemplos de código

````js
var io = require('socket.io');

var server = http.createServer(app);
io.listen(server);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
````

Servidor

````js
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
````
Cliente

````js
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});
````

# Ejercicio:

* Revisa el código del servidor de chat, que vimos en la sección de backbone
* Sigue los pasos de esta [presentación](http://axelhzf.com/node-multiplayer-snake/#/36) para crear un videojuego multijugador en tiempo real



## Referencias
* http://www.html5rocks.com/en/tutorials/websockets/basics/

---
layout: default
title: Node.js
---

# Introducción a Node y NPM


# ¿ Qué vamos a construir?

Para aprender a utilizar Node vamos a crear una aplicación web que permita saber el estado de disponibilidad de las personas en un grupo de trabajo. Supongamos que estamos trabajando en un grupo de programadores en el que las interrupciones son muy habituales: para preguntar dudas, pedir ayuda sobre un bug dificil de solucionar o simplemente para contar un chiste que acaba de leer en twitter. Hay momentos en los que una persona está realizando una tarea importante que necesita concentración y prefiere que no le molesten, por ejemplo cuando está depurando un bug de llamadas asíncronas o cuando está haciendo una migración de datos en producción. Nuestra aplicación permitirá a los programadores fijar un estado entre disponible u ocupado para que el resto del grupo sepa si lo puede interrumpir o no.

Los requisitos son:

- Un usuario se valida con usuairo y contraseña.
- Un usuario puede cambiar de estado entre disponible/ocupado.
- Un usuario puede ver el estado de sus compañeros.

Vamos a hacer una aplicación muy simple. Si en tu día a día tienes este problema, puedes probar [LiveTeamApp](http://www.liveteamapp.com/).

# Instalación de node y npm

Para la instalación de node en Mac OSX o Windows puede descargar el instalador en la [página oficial](http://nodejs.org/).

En Mac OSX existe una mejor opción que es instalarlo utilizando [homebrew](http://mxcl.github.io/homebrew/).

````bash
$ brew install node
````

Esto instalará node únicamente, para instalar npm ejecutamos el comando

````bash
$ curl https://npmjs.org/install.sh | sh
````

En el caso de linux, debemos añadir un repositorio de donde se descargará los paquetes. Puedes seguir [estas instrucciones](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

Para comprobar que todo funciona correctamente

````bash
$ node --version
v0.8.6
````

# Creación del proyecto

[Express](http://expressjs.com/) es un framework para desarrollar aplicaciones web. Es el más extendido en la comunidad de node. El diseño de su API está inspirado en [Sinatra](http://www.sinatrarb.com/). La filosifía de Express es proveer un conjunto de funcionalidades básica y permitir la extensión mediante configuración para añadir nuevas funcionalides.

Normalmente no es una buena práctica instalar paquetes de forma global, pero en el caso de express vamos a hacer una excepción porque viene con un generador de código que nos va a permitir crear un esqueleto de la aplicación. Con la opción `-g` le indicamos a npm que instale el módulo de forma global.

````bash
$ npm install express -g
````

Para crear la aplicación usamos el generador de código de express pasándole el nombre de la aplicación. En este caso `donotdisturb`.

````bash
$ express donotdisturb

   create : donotdisturb
   create : donotdisturb/package.json
   create : donotdisturb/app.js
   create : donotdisturb/public
   create : donotdisturb/public/javascripts
   create : donotdisturb/public/images
   create : donotdisturb/public/stylesheets
   create : donotdisturb/public/stylesheets/style.css
   create : donotdisturb/routes
   create : donotdisturb/routes/index.js
   create : donotdisturb/routes/user.js
   create : donotdisturb/views
   create : donotdisturb/views/layout.jade
   create : donotdisturb/views/index.jade

   install dependencies:
     $ cd donotdisturb && npm install

   run the app:
     $ node app
````

Como vemos en la salida, esto genera una serie de ficheros y además nos da unas instrucciones para instalar las dependencias y lanzar la aplicación. Si seguimos las instrucciones podemos desplegar la aplicación.

````bash
$ cd donotdisturb
$ npm install
$ node app
    Express server listening on port 3000
````

En la dirección [http://localhost:3000/](http://localhost:3000/) está la aplicación levantada.

El comando `npm install` le indica a npm que descargue todas las dependencias de la aplicación. Las dependencias se especifica en el fichero package.json. Por defecto el generador de código de express nos añadió dos dependencias: `express` y `jade`.

[Jade](http://jade-lang.com/) es el sistema de plantillas por defecto que utiliza express, pero se puede utilizar para utilizar otro sistema.

````js
$ cat package.json
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.2.1",
    "jade": "*"
  }
}
````

# Creación de la página de login

Para crear la página de login empezaremos por la ruta. Dentro de la carpeta routes crea el fichero `login.js`. Con el siguiente contenido.

````js
var login = function (app) {
    app.get("/login", function (req, res) {
        res.render('login', { title: 'Login' });
    });
};

module.exports = login;
````

La funcion login recibe como parámetros la aplicación express y setea una ruta. En este caso, cuando se haga una petición GET a la url /login, se ejecutará el callback. El callback recibe dos parámetros: `request` y `response`. El callback está renderizando la vista `login` pasandole como parámetro `title`.

Node.js utiliza un sistema de módulo basado en CommonJS. [Aquí](http://docs.nodejitsu.com/articles/getting-started/what-is-require) tienes más información de cómo funciona el sistema de módulos. En lo que respecta a este trozo de código, lo que estamos haciendo con la linea `module.exports = login` es permitir que la función login se pueda utilizar desde otro fichero. Para poder utilizarla se utiliza la función `require`.

````js
var login = require('./routes/login')
````

Ahora tenemos que indicarle a la aplicación que incluya las rutas que definimos en el login y podemos borrar el resto de rutas que no vamos a utilizar.

````js
require('./app/login')(app);
````

Si reiniciamos el servidor y abrimos la página http://localhost:3000/login deberemos ver una página de error de express diciendo que no encuentra la vista `login`, eso es porque todavía no la hemos creado.

````jade
extends layout

block content
    form(method='POST', class="login-form")
        .control-group
            input(type='text', placeholder='username')
        .control-group
            input(type='password', placeholder='password')
        button(type='submit', class='btn btn-primary')
            | Sign in
````

# Añadiendo estilo

Para añadir librerias para el front-end vamos a utilizar bower como hemos utilizado hasta ahora. Express tiene una carpeta `public` que es donde añade los recursos estáticos. En este ejemplo vamos a descargar los componentes de bower directamente en esa carpeta. Normalmente un componente de bower viene con mucho ficheros, por ejemplo en el caso de flat-ui, vienen los ficheros de fuentes sass y los ficheros generados .css. Lo ideal sería utilizar grunt, para compilar los ficheros y colocar en la carpeta pública únicamente los ficheros generados. Para simplificar descargaremos los componentes directamente en la carpeta pública. Para cambiar la ruta por defecto donde bower se descarga los componentes crea un fichero `.bowerrc` con el contenido.

````js
{
  "directory" : "public/components"
}
````

Añade la librería flat-ui

````bash
bower install flat-ui --save
````

Comprueba que el componente se haya descargado en la carpeta `public/components/flat-ui/`.

El ficheros `view/layout.jade` es la plantilla que se encarga de poner los tags html y body y tiene un bloque de código para que la plantilla que lo incluye añada el contenido. Vamos a modificar este fichero añadiendo los nuevos estilos que vienen con el componente que acabamos de descargar.

````jade
doctype 5
html
  head
    title= title
    link(rel='stylesheet', href='/components/flat-ui/css/bootstrap.css')
    link(rel='stylesheet', href='/components/flat-ui/css/flat-ui.css')
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
````

En la página de login vamos a referenciar esta plantilla y vamos a añadir algunas clases css para utilizar los estilos que acabamos de descargar.

````jade
extends layout
block content
    form(method='POST')
        .login-screen
            .login-icon
                img(src="/components/flat-ui/images/illustrations/time.png")
            .login-form
                h4 Welcome to Do Not Disturb
                .control-group
                    input(type='text', placeholder='username', class='login-field')
                    label(class='login-field-icon fui-man-16')
                .control-group
                    input(type='password', placeholder='password', class='login-field')
                    label(class='login-field-icon fui-lock-16')
                button(type='submit', class='btn btn-primary btn-large')
                    | Sign in
````

Añade también el contenido del fichero stylesheets/style.css

Si todo va bien, deberías tener una página de inicio como esta

![Login](images/node-login.png)

# Auto reload

A diferencia de otros framework web, como podría ser rails o play. Los cambios no se recargan en caliente. Esto no supone mucho problema, la aplicación se levanta muy rápido por lo que no perdemos tiempo reiniciando el servidor. El único tiempo que podemos perder es si realizamos la tarea a mano, por eso vamos a utilizar un paquete que realiza esta tarea de forma automática.

````bash
npm install node-dev --save
````

Si nos fijamos en fichero `package.json`, npm añadió la dependencia junto con el resto de dependencias. Esto no es del todo correcto, esta dependencia la vamos a utilizar únicamente cuando estemos desarollando, no queremos que nuestro servidor de producción la descargue.

````js
"dependencies" : {
    "express" : "3.2.1",
    "jade" : "*"
},
"devDependencies" : {
    "node-dev" : "~2.0.1"
}
````

Para instalar todas las dependencias podemos seguir utilizando el comando `npm install` en el caso de que no queramos instalar las dependencias de desarollo `npm install --production`.

Para que el auto reload funcione tenemos que arrancar la aplicación con node-dev.

````bash
$ node-dev app.js
````

Prueba a hacer algún cambio, por ejemplo el título de la página de login y comprueba que se recarga correctamente.

# Middleware: Sesiones y Flash

Express utiliza [Connect](http://www.senchalabs.org/connect/), una framework de middleware para extender las funcionalidades básica del servidor. Connect fue diseñado para añadir funcionalidades como sesiones, coockies o logging. Podemos entender un middleware como un filtro que se encarga de procesar de alguna manera la request o la response.

Para nuestra aplicación vamos a necesitar sesiones, para almacenar quién es el usuario que está logueado. También vamos a utilizar mensajes de flash. Estos mensajes se almacenan en la sesion, pero su tiempo de vida dura únicamente hasta la siguiente petición. Son útiles para enviar mensaje de error o para indicar que una acción se realizó correctamente.


Lo primero que necesitamos es añadir soporte para sesiones en el servidor. Para ello, tenemos varias opciones, almacenarlas en memoria, en una cookie o en base de datos. La opción de almacenarla en [memoria](http://www.senchalabs.org/connect/session.html) no escala bien si nuestra aplicación se va a ejecutar en varios servidores a la vez. La opción de almacenarla en [cookie](http://www.senchalabs.org/connect/cookieSession.html) tiene la limitación de que sólo permite almacenar 4k de información. En nuestra caso será más que suficiente. Si queremos almacenar las sesiones en base de datos tenemos varios middleware para distintas base de datos, por ejemplo [mongo](https://github.com/kcbanner/connect-mongo) o [redis](https://github.com/visionmedia/connect-redis).

Para activar el uso de sesiones con cookie, en el fichero `app.js`

````js
app.use(express.cookieParser("Super secret"));
app.use(express.cookieSession());
````

Con el método `use` configuramos los middleware. Ten en cuenta que el orden en el que se definen los middleware es el mismo orden en el que se van a ejecutar. En este caso, queremos que se ejecuten antes del router de la aplicación.

Cuando el usuario haga login, se comprobará su usuario y contraseña. En el caso de que sean correctas se le creará la sesión.

````js
    app.post('/login', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        if (username === 'user1' && password === 'user1') {
            req.session = {'username' : username};
            res.redirect("/");
        } else {
            res.redirect("/login");
        }
    });

    app.get('/logout', function (req, res) {
        req.session.username = null;
        res.redirect('/');
    });
````

Por ahora nuestra autenticación es muy sencilla, se está validando únicamente que el usuario y la contraseña sean `user1`. Cuando añadamos la base de datos mejoraremos esta parte.

Ahora lo que vamos a hacer es añadir seguridad a la página de inicio, de forma que cuando un usuario accede, si no está logueado se le haga un redirect a la página de login. Para ello vamos a crear nuestro propio middleware de seguridad, en el fichero `app/security.js`.

````js
var security = function (req, res, next) {
    if(!req.session.username) {
        res.redirect("/login");
    }else {
        next();
    }
};
module.exports = security;
````

Ahora aplicamos este middleware en la página de inicio

````js
var security = require("./security");

var index = function (app) {

    app.get("/", security, function (req, res) {
        res.send("Hi " + req.session.username);
    });

};

module.exports = index;
````

Si todo está correcto, cuando vamos a la página de inicio nos debería redirigir al login. Si ponemos las credenciales correcta nos debería redirigir a la página de inicio y mostrar nuestro username en pantalla. Abre las herramientas de desarrollador y comprueba que está la cookie que hemos definido.

Para los mensajes de flash vamos a utilizar `connect-flash`.

````bash
$ npm install connect-flash --save
````

Y lo añadimos a la configuración del servidor

````js
var flash = require('connect-flash');
app.use(flash());
````

Flash require de sesión, por lo tanto colocalo después del middleware de sesión.

Para añadir mensajes, basta con utilizar el código

````js
req.flash("info", "welcome " + username);
````

El primer parámetro es el tipo de mensaje, por ejemplo info o error. Para acceder a los mensajes

````js
req.flash('info'); // Accede a los mensaje de info
req.flash(); // Accede a todos los mensajes
````
Una vez se accede a los mensajes estos se borran.

Añade mensaje cuando al hacer login correcto o incorrecto y al hacer logout.

Para mostrar los mensajes de flash vamos a crear una utilidad que ponga los mensajes de flash en la plantilla. Para ello vamos a utilizar la variable `res.locals`. Todo los que añadas a esta variable estará disponible en todas las plantillas. Para el método vamos a utilizar underscore, así que primero vamos a instalarlo.

````js
$ npm install underscore --save
````

El código de la utilidad lo pondremos en el fichero `app/messages.js`

````js
var _ = require('underscore');
var messages = function (req, res, next) {
    res.locals.messages = function () {
        var flash = req.flash() || {};
        var allMessages = [];
        _.each(flash, function (messages, type) {
            _.each(messages, function (message) {
                allMessages.push({type : type, text : message});
            })
        });
        return allMessages;
    }
    next();
}
module.exports = messages;
````

Lo único que estamos haciendo es definiendo una función que transforma los mensajes de flash en un array de mensajes con type y text. De forma que nos resulte sencillo renderizarlos en la plantilla. Para renderizarlos en la plantilla



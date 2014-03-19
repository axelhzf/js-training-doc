---
layout: default
title: Testing Node.js Applications
---

Ya tenemos una funcionalidad básica de nuestra aplicación. Vamos a ver cómo podemos testearla. En esta sección vamos a ver cómo hacer dos tipos de tests: unitarios y de integración.

# Dependencias

Como framework de test utilizaremos mocha, pero esta vez no utilizaremos la versión del navegador, sino que lo instalaremos como un módulo.

````bash
$ npm install mocha --save
$ npm install chai --save
$ npm install sinon --save
````

Estas dependencias las utilizaremos en los test, así que mejor si modifica el fichero package.json para incluir estas dependencias en el grupo de `devDependencies`.

Además de mocha y chai, que ya conocemos. Vamos a utilizar [sinon.js](http://sinonjs.org/), una librería de spies, stubs y mocks. 

# Tests unitarios

Vamos a empezar creando un test unitario del middleware de seguridad que creamos en la sección anterior. Esta función se encargaba de redirigir a la página de login en el caso de que el usuario no tuviera una sesión creada.

Crea un fichero `test/unit/securityTest.js`.

````js
var expect = require('chai').expect;
var sinon = require('sinon');
var security = require('../../app/security')

describe("security", function () {

    var request, response, next;

    beforeEach(function () {
        request = {
            session : {}
        };
        response = {
            redirect : sinon.spy()
        }
        next = sinon.spy();
    });

    it("should redirect to login if not session", function () {
        security(request, response, next);
        expect(response.redirect.calledWith("/login")).to.be.true;
        expect(next.called).to.be.false;
    });

    it("should continue the chain if there is a session", function () {
        request.session.username = 'superman';
        security(request, response, next);
        expect(response.redirect.called).to.be.false;
        expect(next.called).to.be.true;
    });

});
````

En primer lugar este código hace los require de chai, sinon y del módulo de seguridad que vamos a testear. En el método `beforeEach` preparamos los objetos de request, response y next. El primer test, comprueba que cuando no hay username en la sesión se llama al método redirect. En el segundo se comprueba que cuando existe un username en la sesión se llama a next.

Para ejecutar los tests ejecuta el comando

````js
$ mocha test/unit
````

# Ejercicio

Crea un test unitario para el módulo messages. Recuerda que la funcionalidad de este módulo era transforma el formato de los mensajes que estan en `req.flash` en una lista de objeto con type y text.

# Solución

````js
var expect = require('chai').expect;
var sinon = require('sinon');
var messages = require('../../app/messages.js')

describe("messages", function () {

    it("should transform the flash messages", function () {
        var next = sinon.spy();
        var req = {
            flash : function () {
                return {"info" : ["info1", "info2"], "error" : ["error1"]};
            }
        };
        var res = {
            locals : {}
        };
        messages(req, res, next)
        expect(next.called).to.be.true;
        expect(res.locals.messages()).to.deep.equal(
            [
                {type: 'info', text : "info1"},
                {type: 'info', text : "info2"},
                {type: 'error', text : "error1"}
            ]
        );
    });

});
````

# Tests de integración

Para los test de integración vamos a levantar el servidor y vamos hacer peticiones. Vamos a añadir un cliente http para poder hacer peticiones a nuestro propio servidor. Igual que en el caso anterior, añade a las dependencias de desarrollo.

````bash
$ npm install request --save
````

````js
var expect = require('chai').expect;
var request = require('request');
var app = require('../../app.js');

describe("login", function () {

    it("should redirect to login page", function (done) {
        var options = {
            url : 'http://localhost:3000',
            followRedirect : false
        };

        request(options, function (error, response, body) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal("/login");
            done();
        });
    });

    it("should redirect to / if credentials are ok", function (done) {
        var options = {
            url : 'http://localhost:3000/login',
            followRedirect : false,
            form : {username : "user1", password : "user1"}
        };

        request.post(options, function (error, response, body) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal("/");
            expect(response.headers['set-cookie'][0]).to.have.string('connect.sess');
            done();
        });
    });

});
````

En este código estamos haciendo un require de chai y de request. Además estamos incluyendo el servidor ('app.js'). Al incluir el servidor este se ejecuta, como podrás ver en la salida de la consola.

En código de test consiste en dos peticiones http y se comprueba que la respuesta sea la esperada. En el primer caso que sea realiza un redirect a la página de login. En el segundo caso qeu se haga un redirect a la página de inicio, comprobando además que se ha creado la cookie de sesión.

# Test de integración con PhantomJS

Vamos a ir un paso más allá y vamos a añadir [PhantomJS](http://phantomjs.org/), un headless webkit. Nos va a permitir abrir páginas y ejecutar código javascript directamente en la página que estamos ejecutando. Instala el módulo y añádelo a las dependencias de test.

````bash
$ npm install node-phantom --save
````

Añadimos un nuevos describe al fichero de test que teníamos

````js
var phantom = require('node-phantom');

    describe("page", function (done) {
        var ph;

        before(function (done) {
            phantom.create(function (err, _ph) {
                ph = _ph;
                done();
            });
        });

        after(function () {
            ph.exit();
        });

        it("should contains form with username & password", function (done) {
            ph.createPage(function (err, page) {
                page.open("http://localhost:3000/login", function (err, status) {
                    page.evaluate(function () {
                        var result = {};
                        result.hasUsernameInput = $('input[name="username"]').length > 0;
                        result.hasPasswordInput = $('input[name="password"]').length > 0;
                        return result;
                    }, function (err, result) {
                        expect(result.hasUsernameInput).to.be.true;
                        expect(result.hasPasswordInput).to.be.true;
                        done();
                    });
                });
            });
        });

    });

````

En este test estamos abriendo la página de login y con la función `page.evaluate` estamos ejecutando código en la página web, por eso tenemos accesible jQuery y podemos ejecutar selectores sobre el código HTML de la página. Con los selectores estamos comprobando que existe un campo inputs para username y password.

Mocha se pone muy nervioso si alguien declara variables globales. En este caso phantom declara una variable global. Si queremos ejecutar nuestro test sin problemas

````bash
$ mocha test/integration/ --globals location
````

# Ejercicio

Crea un test para la página de inicio que comprueba que aparece el nombre del usuario en pantalla. La página de inicio requiere login así que necesitarás primero setear una cookie.

Para añadir una cookie puedes utilizar el método `addCookie` de page. El valor de la cookie está obtenido del navegador

````js
                ph.addCookie({
                    'name':     'connect.sess',
                    'value':    's%3Aj%3A%7B%22username%22%3A%22user1%22%2C%22flash%22%3A%7B%22info%22%3A%5B%22welcome%20user1%22%5D%7D%7D.hv5tYPteWCgAl1uSG02vDSy6TEYcviBs2oN29pvN3IY',
                    'domain':   'localhost'
                });
````

# Solución

Para facilitar un poco el test, modifiqué la página de inicio añadiendo una clase css para luego poder hacer el selector.

````jade
h1(class="welcome-username") Welcome to #{username}
````

````js
describe("index", function () {

    describe("page", function (done) {
        var ph;

        before(function (done) {
            phantom.create(function (err, _ph) {
                ph = _ph;

                ph.addCookie({
                    'name':     'connect.sess',
                    'value':    's%3Aj%3A%7B%22username%22%3A%22user1%22%2C%22flash%22%3A%7B%22info%22%3A%5B%22welcome%20user1%22%5D%7D%7D.hv5tYPteWCgAl1uSG02vDSy6TEYcviBs2oN29pvN3IY',
                    'domain':   'localhost'
                });

                done();
            });
        });

        after(function () {
            ph.exit();
        });

        it("should contains a title with the username", function (done) {
            ph.createPage(function (err, page) {
                page.open("http://localhost:3000", function (err, status) {
                    page.evaluate(function () {
                        var result = {};
                        result.title = $(".welcome-username").text();
                        return result;
                    }, function (err, result) {
                        expect(result.title).to.equal("Welcome to user1");
                        done();
                    });
                });
            });
        });

    });
});
````

# Referencias
* [Sinon.js](http://sinonjs.org/docs/)
* [node-phantom](https://github.com/alexscheelmeyer/node-phantom)
* [Phantom.JS](http://phantomjs.org/)



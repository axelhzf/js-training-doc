---
layout: default
title : Persistencia con mongodb
---

# Introducción

MongoDB es una base de datos NoSQL, open source que fue lanzada en 2009. Las base de datos NoSQL se diferencian de las bases de datos relacionales en que los datos no se almacenan en tablas sino en estructuras de datos de tipo JSON. Esto hace que trabajar con MongoDB y JavaScript sea muy natural, no es necesario transformar los datos de tablas o objetos. La principal ventaja de las bases de datos NoSQL es que no requieren un esquema de información fijo y que ofrecen una alta escalabilidad. NoSQL no es la mejor opción en todos los casos, hay que estudiar el caso concreto y analizar el tipo de datos que vamos a manejar.

Existen muchas otras bases de datos NoSQL como [CouchDB](https://github.com/felixge/node-couchdb), [Redis](https://github.com/mranney/node_redis) o [Cassandra](https://github.com/racker/node-cassandra-client). Si prefieres utilizar base de datos relacionales también existen clientes para node: [MySQL](https://github.com/felixge/node-mysql) o [PostgreSQL](https://github.com/brianc/node-postgres).

# Mongo instalación

Para la instalación de mongo seguimos los pasos de la [documentación oficial](http://docs.mongodb.org/manual/installation/). En el caso de OSX, recomiendan hacer la instalación con homebrew.

````bash
$ brew install mongo
````

Para arrancar la base de datos

````bash
$ mongod
````

Para acceder a la base de datos con el cliente

````bash
$ mongo
````

Podemos probar a ejecutar algunas sentencias

````bash
> db.test.save( { a: 1 } )
> db.test.find()
````

# Mongo comandos básico

Primero vamos a aclarar algunos términos. En MongoDB puedes tener varias bases de datos exactamente igual que con MySQL. Pero dentro de esas base de datos no hay tablas, hay colecciones. Puedes entender una colección como una tabla exceptuando que una colección no tiene por qué tener un número de columnas fijas. Por ejemplo, si tenemos una colección de usuario, un usuario puede tener los campos nombre y apellido, mientras que otro puede tener nombre y email. Dentro de las colección tenemos documentos, que siguiendo el símil con el modelo de datos relacional, serían las filas de las tablas.

En esta página de documentación tienes una [referencia rápida a los comandos básicos](http://docs.mongodb.org/manual/reference/javascript/).

````js
> show dbs
> use mydb
> db
> db.users.insert({name : "luke", lastName : "skywalker"})
> db.users.insert({lastName : "kent", email : "clark@dailyplanet.com"});
> show collections
> db.users.find()
> db.users.find({name : "luke"})
> db.users.findOne()
> db.users.find().limit(1) 
> db.users.find().sort({name : 1})
> db.users.find().sort({name : -1})
> db.users.count()
> db.users.update({lastName : "kent"}, {$set : {name : "clark"}})
> db.users.find()
> db.users.remove({name : "luke"})
> db.users.remove()
````

Yo vengo del mundo de las base de datos relacionales y algo que me ayudó bastante al principio es esta [página de documentación](http://docs.mongodb.org/manual/reference/sql-comparison/) que compara cómo harías las cosas en SQL frente a como lo harías en MongoDB.

# MongoDB y Node.js

Para Node.js tenemos el [cliente nativo](https://github.com/mongodb/node-mongodb-native) que nos permite trabajar directamente con la base de datos. Nuestro caso es bastante sencillo y esto nos podría bastar más que de sobra, pero vamos a utilizar una librería por encima de más alto nivel, [mongoose](http://mongoosejs.com/).

````bash
$ npm install mongoose --save
````

Crea el primer modelo para almacenar usuarios en `modelos/User.js`

````js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username : {
        type : String,
        required : true,
        index : { unique : true }
    },
    password : {
        type : String,
        required : true
    },
    creation_date : {type : Date, default : Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
````

En el esquema estamos definiendo que tanto el campo username como password son campos requeridos. Y que la fecha de creación por defecto va a ser la fecha actual.

Tal como planteamos el formulario de login. Únicamente hacemos login, no tenemos formulario de registro. Vamos a añadir un método estático al modelo user que haga esto:
- En caso de que no exista el username lo creamos
- En caso de que exista, comprobamos que la contraseña sea la misma y devolvemos el usuario

````js
userSchema.statics.login = function (attributes, cb) {
    var Model = this;
    Model.findOne({username : attributes.username}, function (err, user) {
        if (user) {
            if( attributes.password !== user.password) {
                cb("Invalid");
            } else {
                cb(null, user);
            }
        } else {
            var newUser = new Model(attributes);
            newUser.save(cb);
        }
    });
};
````

Vamos a crear unos tests para probar este método

````js
var mongoose = require('mongoose');
var expect = require('chai').expect;
var User = require("../../../model/User.js");

describe("User", function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost/donotdisturb-test');
        var db = mongoose.connection;
        db.once("open", done);
    });

    beforeEach(function (done) {
        User.remove(function () {
            done();
        });
    });

    describe("login", function () {

        it("should create a user if username not exists", function (done) {
            User.login({username : "Dwight Schrute", password : "beet"}, function (err, user) {
                expect(user.id).not.to.be.undefined;
                done();
            });
        });

        it("should return the user if the username ant the password are correct", function (done) {
            var userData = {username : "Dwight Schrute", password : "beet"};
            User.login(userData, function (err, userCreation) {
                User.login(userData, function (err, userLogin) {
                    expect(userLogin.id).to.be.equal(userCreation.id);
                    done();
                })
            });
        });

        it("should return error if the password is incorrect", function (done) {
            var userData = {username : "Dwight Schrute", password : "beet"};
            User.login(userData, function (err, userCreation) {
                userData.password = 'incorrect';
                User.login(userData, function (err, userLogin) {
                    expect(err).to.equal("Invalid");
                    done();
                })
            });
        });
    });

});
````



# Referencias
* http://mongoosejs.com/
* 


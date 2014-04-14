---
layout: default
title: Gulp
---

# Build systems

El proceso de desarrollar aplicaciones front-end ha cambiado mucho en los últimos años. Atrás quedó la epoca en que era suficiente con un único fichero javascript y un fichero de css. Las aplicaciones son cada vez más complejas y requieren de múltiples pasos para su construcción. Por ejemplo alguna de las tareas más habituales son:

* Detección de errores y convenciones de código (JSHint)
* Minimización de ficheros js
* Uso de algún preprocesador de css (sass, less)
* Optimización de imágenes
* Compilación de plantillas (handlebars, angular)
* Generación de iconfonts
* Ejecución de tests

Todas estas tareas quitan mucho tiempo y es por eso que surge la necesidad de buscar herramientas que permitan automatizar todo el proceso. Se pueden utilizar [herramientas genéricas como `make`](http://dailyjs.com/2011/08/11/framework-75/) o se pueden utilizar herramientas más específicas como [grunt](http://gruntjs.com/) o [gulp](http://gulpjs.com/).

# Build wars

http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt

# Creando el primer Gulpfile.js

Vamos a crear un build script que nos permita:

* [Compilar CoffeeScript](https://github.com/wearefractal/gulp-coffee)
* [Compilar sass](https://github.com/dlmanning/gulp-sass)
* [Concat](https://github.com/wearefractal/gulp-concat)
* LiveReload!

El código de ejemplo lo puedes ver en :

PONER URL DEL REPOSITORIO

Para empezar vamos a instalar las dependencias

```
npm install gulp gulp-util gulp-sass gulp-coffee gulp-livereload gulp-clean gulp-concat gulp-connect --save
```

El código del Gulpfile sería el siguiente

```js
var gulp = require("gulp");
var gutil = require("gulp-util");
var coffee = require("gulp-coffee");
var sass = require("gulp-sass");
var reload = require("gulp-livereload");
var clean = require("gulp-clean");
var concat = require("gulp-concat");
var connect = require("gulp-connect");

var paths = {
  html: "app/*.html",
  coffee: "app/coffee/*.coffee",
  sass: "app/sass/style.scss",
  dist: "dist"
};

gulp.task("clean", function () {
  return gulp.src(paths.dist, {read: false}).pipe(clean());
});

gulp.task("coffee", function () {
  gulp.src(paths.coffee)
    .pipe(coffee())
    .on("error", gutil.log)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist + "/js"))
    .pipe(connect.reload());
});

gulp.task("sass", function () {
  gulp.src(paths.sass)
    .pipe(sass())
    .on("error", gutil.log)
    .pipe(gulp.dest(paths.dist + "/css"))
    .pipe(connect.reload());
});

gulp.task("build", ["coffee", "sass"]);

gulp.task("default", ["clean"], function () {
  gulp.start("build");
});

gulp.task('connect', connect.server({
  root: ["app", "dist"],
  port: 3000,
  livereload: true
}));

gulp.task('html', function () {
  gulp.src(paths.coffee).pipe(connect.reload());
});

gulp.task("watch", ["connect"], function () {
  gulp.watch(paths.coffee, ["coffee"]);
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.html, ["html"]);
});
```

Para ejecutar las tareas

```
gulp
gulp watch
```


# Ejercicio

Crea un fichero Gulpfile que utilice los siguientes plugins:

* jshint
* sass
* browserify
* closure
* image-min
* livereload

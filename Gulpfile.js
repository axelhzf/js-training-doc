var gulp = require("gulp");
var jade = require("gulp-jade");
var clean = require("gulp-clean");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var marked = require("marked");
var jadeBlog = require("gulp-jadeblog");
var changed = require("gulp-changed");
var gutil = require("gulp-util");

var outPath = "out";

marked.setOptions({
  highlight: function (code) {
    return require("highlight.js").highlightAuto(code).value;
  }
});

gulp.task("posts-incremental", function () {
  gulp.src(["src/documents/**/*.md"])
    .pipe(changed(outPath, { extension: '.html' }))
    .pipe(jadeBlog())
    .pipe(jade({
      basedir: __dirname,
      pretty: true
    }))
    .pipe(gulp.dest(outPath))
    .on('error', gutil.log)
    .pipe(connect.reload());
});

gulp.task("posts", function () {
  gulp.src(["src/documents/**/*.md"])
    .pipe(jadeBlog())
    .pipe(jade({
      basedir: __dirname,
      pretty: true
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(outPath));
});

gulp.task("static", function () {
  gulp.src("src/files/**/*")
    .pipe(changed(outPath))
    .pipe(gulp.dest(outPath));
});

gulp.task("static-incremental", function () {
  gulp.src("src/files/**/*")
    .pipe(changed(outPath))
    .pipe(gulp.dest(outPath));
});


gulp.task("clean", function () {
  return gulp.src(outPath, {
    read: false
  }).pipe(clean());
});

gulp.task("build", ["static", "sass", "posts"]);

gulp.task("connect", connect.server({
  root: [outPath],
  port: 9000,
  livereload: true
}));

gulp.task("sass", function () {
  gulp.src("src/documents/styles/main.scss")
    .pipe(sass({
      includePaths: [require("node-bourbon").includePaths]
    }))
    .pipe(gulp.dest(outPath + "/styles"))
    .on('error', gutil.log)
    .pipe(connect.reload());
});

gulp.task("watch", ["connect"], function () {
  gulp.start("posts");
  gulp.watch([
    "src/documents/**/*.md",
    "src/documents/**/*.jade"
  ], ["posts-incremental"]);
  gulp.watch(["src/layouts/**/*.jade"], ["posts"]);
  gulp.watch(["src/documents/styles/*.scss"], ["sass"]);
  gulp.watch(["src/files/**/*"], ["static-incremental"]);
});

gulp.task("default", ["clean"], function () {
  gulp.start("build");
});


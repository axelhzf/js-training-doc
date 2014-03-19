var gulp = require("gulp");
var jade = require("gulp-jade");
var clean = require("gulp-clean");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var marked = require("marked");
var jadeBlog = require("gulp-jadeblog");

var outPath = "out";

marked.setOptions({
  highlight: function (code) {
    return require("highlight.js").highlightAuto(code).value;
  }
});

gulp.task("posts", function () {
  gulp.src(["src/documents/**/*.md", "src/documents/**/*.jade"])
    .pipe(jadeBlog())
    .pipe(jade({
      basedir: __dirname,
      pretty: true
    }))
    .pipe(gulp.dest(outPath));
});

gulp.task("static", function () {
  gulp.src("src/files/**/*")
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
  port: 9000
}));

gulp.task("sass", function () {
  gulp.src("src/assets/styles/main.scss")
    .pipe(sass({
      includePaths: [require("node-bourbon").includePaths]
    }))
    .pipe(gulp.dest(outPath + "/assets/styles"));
});

gulp.task("watch", ["connect"], function () {
  gulp.start("posts");
  gulp.watch(["src/documents/**/*.md", "src/documents/**/*.jade", "src/layouts/*.jade"], ["posts"]);
  gulp.watch(["src/assets/styles/*.scss"], ["sass"]);
});

gulp.task("default", ["clean"], function () {
  gulp.start("build");
});


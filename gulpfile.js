var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var del  = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['/js/index.js'],
  html: '/popup.html',
  css: '/css/index.css',
  icon: '/icon',
  srcRoot: 'src',
  outputPath: 'dist'
};

// 统计task的插件
require('gulp-stats')(gulp);

// 删除outputPath目录
gulp.task('clean', function() {
  del([paths.outputPath]);
});

gulp.task('build', ['static'], function() {
  var iconPath = paths.srcRoot + paths.icon + '/*.png';
  var manifestPath = paths.srcRoot + '/manifest.json';
  gulp.src([iconPath]).pipe(gulp.dest(paths.outputPath + paths.icon));
  return gulp.src([manifestPath]).pipe(gulp.dest(paths.outputPath));
});

gulp.task('uglify', function () {
  var options = {
    // 是否混淆变量名
    mangle: true,
    // 压缩选项
    compress: {
      drop_console: true, // 非常有用，上线前去掉console信息
      drop_debugger: true // 去掉debugger调试语句
    },
    // 是否不压缩(beautify)代码
    output: {
      beautify: false
    }
  };
  return gulp.src(paths.srcRoot + paths.scripts)
             .pipe(uglify(options))
             .pipe(concat('index.js'))
             .pipe(gulp.dest(paths.outputPath + '/js'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.srcRoot + paths.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.outputPath + '/css'));
});

gulp.task('minify-html', function() {
  return gulp.src(paths.srcRoot + paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.outputPath));
});


gulp.task('static', ['minify-html', 'minify-css', 'uglify']);


gulp.task('default', ['build']);


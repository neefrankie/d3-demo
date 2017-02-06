const fs = require('fs-jetpack');
const path = require('path');
const co = require('co');
const nunjucks = require('nunjucks');
const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(
    [process.cwd(), 'views'],
    {noCache: true, }
  ),
  {autoescape: false}
);

function render(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

var cache;

const del = require('del');
const browserSync = require('browser-sync').create();
const cssnext = require('postcss-cssnext');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('html', () => {
  return co(function *() {
    const destDir = '.tmp';

    const html = yield render('index.html');

    yield fs.writeAsync(`${destDir}/index.html`, html, 'utf8');  
  })
  .then(function(){
    browserSync.reload('*.html');
  }, function(err) {
    console.error(err.stack);
  });
});

gulp.task('styles', function () {
  const DEST = '.tmp/styles';

  return gulp.src('client/main.scss')
    .pipe($.changed(DEST)) 
    .pipe($.plumber()) 
    .pipe($.sourcemaps.init({loadMaps:true})) 
    .pipe($.sass({ 
      outputStyle: 'expanded',
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({ 
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream({once: true})); 
});

gulp.task('scripts', () => {
  
  return rollup({
    entry: 'client/main.js',
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    cache: cache
  }).then(function(bundle) {
    // Cache for later use
    cache = bundle;

    // Or only use this
    return bundle.write({
      dest: '.tmp/scripts/main.js',
      format: 'iife',
      sourceMap: true
    });
  })
  .then(() => {
    browserSync.reload();
  })
  .catch(err => {
    console.log(err);
  });
});

gulp.task('serve', 
  gulp.parallel(
    'html', 'styles', 'scripts',

    function serve() {
    browserSync.init({
      server: {
        baseDir: ['.tmp', 'data'],
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    });

    gulp.watch('client/**/*.scss', gulp.parallel('styles'));
    gulp.watch('client/**/*.js', gulp.parallel('scripts'));
    gulp.watch('views/*.html', gulp.parallel('html'));
  })
);

gulp.task('clean', function() {
  return del(['.tmp/**', 'dist']).then(()=>{
    console.log('dir .tmp and dist deleted');
  });
});
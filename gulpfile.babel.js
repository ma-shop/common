import path from 'path'

import gulp from 'gulp'
import log from 'fancy-log'
import through from 'through2'
import chalk from 'chalk'
import plumber from 'gulp-plumber'
import newer from 'gulp-newer'
import babel from 'gulp-babel'


function swapSrcWithDist (src) {
  return src.replace(/\bsrc\b/, 'dist')
}

function rename (fn) {
  return through.obj((file, enc, callback) => {
    // this is the only way to get it to work
    // eslint-disable-next-line no-param-reassign
    file.path = fn(file)

    callback(null, file)
  })
}

const packages = path.join(__dirname, 'packages/*/src/**/*.mjs')

gulp.task('build', () => {
  const base = path.join(__dirname, 'packages')

  return gulp
    .src(packages, { base })
    .pipe(plumber({
      errorHandler (err) {
        log(err.stack)
      },
    }))
    .pipe(newer({ dest: base, map: swapSrcWithDist }))
    .pipe(through.obj((file, enc, callback) => {
      log('Compiling', `'${chalk.cyan(file.relative)}'...`)
      callback(null, file)
    }))
    .pipe(babel({
      minified: false,
      compact: false,
    }))
    // Passing 'file.relative' because newer() above uses a relative
    // path and this keeps it consistent.
    .pipe(rename((file) => path.resolve(file.base, swapSrcWithDist(file.relative))))
    .pipe(gulp.dest(base))
})

gulp.task(
  'watch',
  gulp.series('build', () => {
    return gulp.watch(packages, { debounceDelay: 200 }, gulp.series('build'))
  }),
)

gulp.task('default', gulp.series('build'))

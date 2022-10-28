import webpackStream from 'webpack-stream'
import babel from 'gulp-babel'


export const js = () => {
  return app.gulp.src( app.path.src.js, { sourcemaps: app.isDev } )
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( app.plugins.if( app.isBuild, babel() ) )
  .pipe( webpackStream( app.configs.webpack ) )
  .pipe( app.gulp.dest(app.path.build.js), { sourcemaps: app.isDev } )
  .pipe( app.plugins.if( app.isDev, app.plugins.browserSync.stream() ) )
}
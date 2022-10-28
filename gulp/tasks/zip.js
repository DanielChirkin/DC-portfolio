import zipPlugin from 'gulp-zip'
import clean from 'gulp-clean'


export const zip = () => {
  app.gulp.src( `./${app.path.rootFolder}.zip`, { allowEmpty: true } )
  .pipe( clean() )
  return app.gulp.src( `${app.path.buildFolder}/**/*.*` )
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'ZIP',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( zipPlugin(`${app.path.rootFolder}.zip`) )
  .pipe( app.gulp.dest( './' ) )
}
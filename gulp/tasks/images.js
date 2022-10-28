import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
  return app.gulp.src(app.path.src.images) // read
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'IMAGES',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( app.plugins.newer( app.path.build.images) )
  .pipe( app.plugins.if( app.isBuild, imagemin(app.configs.imagemin) ) )
  .pipe( app.plugins.if( app.isBuild, app.gulp.dest(app.path.build.images) ) )
  .pipe( app.plugins.if( app.isBuild, app.gulp.src(app.path.src.images) ) )
  .pipe( app.plugins.if( app.isBuild, app.plugins.newer( app.path.build.images ) ) )
  .pipe( app.plugins.if( app.isBuild, webp() ) )
  .pipe( app.gulp.dest(app.path.build.images) ) // write
  .pipe( app.gulp.src(app.path.src.svg) )
  .pipe( app.gulp.dest(app.path.build.images) )
  .pipe( app.plugins.if( app.isDev, app.plugins.browserSync.stream() ) )
}
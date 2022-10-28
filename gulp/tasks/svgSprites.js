import svgSprite from 'gulp-svg-sprite'

export const svgSprites = () => {
  return app.gulp.src(app.path.src.svgIcons)
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SVGSPRITES',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( svgSprite( app.configs.svgSprite ) )
  .pipe( app.gulp.dest( `${app.path.srcFolder}/images/` ) )
  .pipe( app.plugins.browserSync.stream() )
}
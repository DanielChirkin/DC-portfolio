import fileInclude from 'gulp-file-include'
import webpHtml from 'gulp-xv-webp-html'
import versionNumber from 'gulp-version-number'
import formatHtml from 'gulp-format-html'
import htmlmin from 'gulp-htmlmin'


export const html = () => {
  return app.gulp.src(app.path.src.html) // read
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( fileInclude() )
  .pipe( app.plugins.if( app.isBuild, webpHtml(app.configs.webpHtml) ) )
  .pipe( app.plugins.replace( '../images/', './images/' ) )
  .pipe( app.plugins.if( app.isBuild, versionNumber( app.configs.versionNumber ) ) )
  .pipe( formatHtml() )
  .pipe( app.gulp.dest(app.path.build.html) )
  .pipe( app.plugins.if( app.isBuild, htmlmin({
    collapseWhitespace: true
  }) ) )
  .pipe( app.plugins.if( app.isBuild, app.plugins.rename({
    extname: '.min.html'
  }) ) )
  .pipe( app.plugins.if( app.isBuild, app.gulp.dest(app.path.build.html) ) ) // write
  .pipe( app.plugins.if( app.isDev, app.plugins.browserSync.stream() ) )
}


// import replace from 'gulp-replace-image-src'
// .pipe( replace({
//   prependSrc : './images/',
//   keepOrigin : false
// }) )

// import replace from 'gulp-replace-image-src-from-data-attr'
// .pipe( replace({ keepOrigin: true }) )
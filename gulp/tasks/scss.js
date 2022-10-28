import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

import gulpSass from 'gulp-sass'
import dartSass from 'sass'
const sass = gulpSass(dartSass)


export const scss = () => {
  return app.gulp.src( app.path.src.scss, { sourcemaps: app.isDev } )
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })
    )
  )
  .pipe( sass( app.configs.scss )
  )
  .pipe( app.plugins.if( app.isBuild, groupCssMediaQueries() ) )
  .pipe( app.plugins.if( app.isBuild, webpcss( app.configs.webpCss ) ) )
  .pipe( app.plugins.if( app.isBuild, autoprefixer( app.configs.autoprefixer ) ) )
  .pipe( app.plugins.if( app.isBuild, app.gulp.dest(app.path.build.css) ) )
  .pipe( app.plugins.if( app.isBuild, cleanCss() ) )
  .pipe( app.plugins.rename( { extname: '.min.css' } ) )
  .pipe( app.gulp.dest(app.path.build.css), { sourcemaps: app.isDev }  )
  .pipe( app.plugins.if( app.isDev, app.plugins.browserSync.stream() ) )
}


// import cssUrlReplace from 'gulp-css-url-replace'
// .pipe( cssUrlReplace( { img:'../images/', font:'../fonts/' } ) )
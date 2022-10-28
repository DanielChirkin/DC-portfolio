// main module
import gulp from 'gulp'
const { series, watch, parallel, task } = gulp


// config import
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'
import { configs } from './gulp/config/configs.js'


// global is global object in nodejs 
global.app = {
  isDev: !process.argv.includes('--build'),
  isBuild: process.argv.includes('--build'),
  gulp: gulp,
  path: path,
  plugins: plugins,
  configs: configs
}

console.log( app.isDev ? 'development' : 'production' );

// task import
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
// import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import { svgSprites } from "./gulp/tasks/svgSprites.js"
import { zip } from './gulp/tasks/zip.js'
import { ftp } from './gulp/tasks/ftp.js'
import { fonts } from './gulp/tasks/fonts.js'

// main tasks
// const fonts = series( otfToTtf, ttfToWoff, fontsStyle )
const mainTasks = series(fonts, parallel( copy, images, svgSprites, js, scss, html ))


// watcher to detect changes
function watcher() {
  watch(path.watch.files, copy)
  watch(path.watch.html, html)
  watch(path.watch.scss, scss)
  watch(path.watch.js, js)
  watch(path.watch.images, images)
  watch(path.watch.svgIcons, svgSprites)
}


// scenarios
const dev = series( reset, mainTasks, parallel( watcher, server ) )
const build = series( reset, mainTasks )
const deployZip = series( reset, mainTasks, zip )
const deployFtp = series( reset, mainTasks, ftp )


// register tasks
task('dev', dev)
task('build', build)
task('deployZip', deployZip)
task('deployFtp', deployFtp)
task('svgSprites', svgSprites)

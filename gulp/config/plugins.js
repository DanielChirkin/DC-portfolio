import replace from 'gulp-replace'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'
import newer from 'gulp-newer'
import rename from 'gulp-rename'
import ifPlugin from 'gulp-if'


export const plugins = {
  rename: rename,
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin
}

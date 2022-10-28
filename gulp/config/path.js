import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())
// path.resolve() without arguments - returns current root directory
// path.basename() returns the last part of passed path

const buildFolder = './dist'
const srcFolder = './src'

export const path = {
  build: {
    fonts: `${buildFolder}/fonts/`,
    images: `${buildFolder}/images/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`
  },
  src: {
    svgIcons: `${srcFolder}/svg-pics/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    images: `${srcFolder}/images/**/*.{jpg,png,jpeg,gif,webp,ico}`, // {a,b} is space sensitive
    svg: `${srcFolder}/images/**/*.svg`,
    js: `${srcFolder}/js/app.js`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`
  },
  watch: {
    svgIcons: `${srcFolder}/svg-pics/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`,
    images: `${srcFolder}/images/**/*.*`,
    js: `${srcFolder}/js/**/*.*`,
    scss: `${srcFolder}/scss/**/*.*`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  nodePath: nodePath,
  ftp: ''
}

// ** - any folders
// *.* - any name, any file extension
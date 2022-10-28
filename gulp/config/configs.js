import { path } from './path.js'
import tildeImporter from 'node-sass-tilde-importer'


const isDev = !process.argv.includes('--build')

export const configs = {
  webpack: {
    mode: isDev ? 'development' : 'production',
    output: {
      filename: 'app.min.js'
    },
    resolve: {
      alias: {
        '~': path.nodePath.resolve(process.cwd(), 'node_modules')
      }
    },
    plugins: [
    ],
    module: {
      rules: [
      ]
    }
  },

  server: {
    server: {
      baseDir: path.build.html
    },
    notify: false,
    port: 3000
  },

  webpHtml: ['.jpg', '.png', '.jpeg', '.gif'],
  versionNumber: {
    'value': '%DT%',
    'append': {
      'key': '_v',
      'cover': 0,
      'to': [
        'css',
        'js',
      ]
    },
    'output': {
      'file': 'gulp/version.json'
    }
  },

  imagemin: {
    optimizationLevel: 3, // 0 to 7
    svgoPlugins: [{ removeViewBox: false }],
    progressive: true,
    interlaced: true ,
    verbose: true
  },

  fonter: {
    formats: ['ttf', 'woff', 'eot']
  },

  svgSprite: {
    mode: {
      stack: {
        sprite: '../sprites/sprite.svg',
        example: false,
        rootviewbox: false,
        render: {
          scss: false // Activate SCSS output (with default options)
        }
      },
      css: false, // create a css sprite
      view: false, // Create a «view» sprite
      defs: false, // Create a «defs» sprite
      symbol: false, // Create a «symbol» sprite
    }
  },

  scss: {
    outputStyle: 'expanded',
    importer: tildeImporter
  },

  webpCss: {
    webpClass: '.webp',
    noWebpClass: '.no-webp',
  },

  autoprefixer: {
    grid: true,
    cascade: true
  }

}

export const server = () => {
  app.plugins.browserSync.init(app.configs.server)
}
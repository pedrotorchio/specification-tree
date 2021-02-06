module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/config.sass"`
      }
    }
  }
}
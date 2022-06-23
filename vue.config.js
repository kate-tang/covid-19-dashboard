const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "src/assets/scss/style.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '^/nchc': {
        target: 'https://covid-19.nchc.org.tw/api/',
        pathRewrite: { '^/nchc': '' }
      }
    }
  }
})

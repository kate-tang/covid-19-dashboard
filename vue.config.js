const path = require('path')
const webpack = require('webpack')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "src/assets/scss/main.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      '^/nchc': {
        target: 'https://covid-19.nchc.org.tw/api/',
        pathRewrite: { '^/nchc': '' }
      },
      '^/covid19': {
        target: 'https://api.covid19api.com/',
        pathRewrite: { '^/covid19': '' }
      },
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/covid-19-dashboard/' : '/',
})

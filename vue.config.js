const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    host:'0.0.0.0',
    port:8080,
    https:false,
    proxy:{
      '/api':{
        // http://localhost:8080/api
        target:'http://www.szyzit.com:8080/api/',
        ws:true,
        changOrigin:true, //允许跨域
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
})

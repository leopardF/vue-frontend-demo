const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open: true,
    //host:'localhost'
    // proxy: 'http://u6w7rm.natappfree.cc/'
    proxy:{
      '/api':{
        target:'http://u6w7rm.natappfree.cc/api/',
        changeOrigin:true,  //允许跨域
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  lintOnSave: false  //关闭语法检测
  
})

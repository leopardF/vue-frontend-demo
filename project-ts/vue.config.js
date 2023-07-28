const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    //host:'localhost'
    // proxy: 'http://u6w7rm.natappfree.cc/'
    proxy: {
      '/api': {
        target: 'http://192.168.219.36:8085/api/',
        changeOrigin: true,  //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false,  //关闭语法检测
  chainWebpack(config) {
    //用chainableWebpack做一些高级配置，包括对loader的添加、修改以及插件的配置
    // chainableWebpack.resolve = { extensions: ['.js','.ts','.json','.d.ts'] }
    config.resolve.extensions
      .add('.js')
      .add('.ts')
      .add('.json')
      .add('.d.ts');
    }

});

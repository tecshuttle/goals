module.exports = {
  //以下配置的效果
  //   “/api/getok.php”  -->   http://122.51.238.153/getok.php
  // 修改的配置
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',   //重写请求路径
        },
        secure: false,
        logLevel: "debug"
      }
    }
  }
}


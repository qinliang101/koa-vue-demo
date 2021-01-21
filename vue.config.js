module.exports = {
    lintOnSave: true,
   
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',   // 代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''    // 代理的路径
                }
            }
        }
    }
}  
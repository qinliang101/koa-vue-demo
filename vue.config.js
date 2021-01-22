module.exports = {
    lintOnSave: true,
   
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3000',   // 代理接口
                changeOrigin: true,
                logLevel: "debug",
                secure: false,
            }
        }
    }
}  
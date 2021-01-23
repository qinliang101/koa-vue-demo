module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = 'Lemon By Leon'
                return args
            })
    },
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
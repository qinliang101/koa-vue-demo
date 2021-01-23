// vue.config.js 该对象将会被 webpack-merge 合并入最终的 webpack 配置
module.exports = {
    lintOnSave: true,
    // 链式操作(改变webpack的配置)
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Lemon By Leon'
                return args
            })
    },
    
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/style/index.scss";`
            },
        }
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
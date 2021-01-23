const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const ctrl = require('./server/utils/ctrl')
const user = require('./server/controller/userController')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist'))

app.use(views(__dirname + '/dist', {
    extension: 'html'
}))

//路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(
    koaJwt({
        secret: '4O4KVGsRuhdCCJOT4BfRCqcMnAa4zA4kUmWB3BSy'
    }).unless({
        path: [/^\/login/, /^\/register/]
    })
)

app.use((ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(' ')
        if (parts.length === 2) {
            // 取出token
            const scheme = parts[0]
            const token = parts[1]
            if (/^Bearer$/i.test(scheme)) {
                try {
                    // jwt.verify方法验证token是否有效
                    jwt.verify(token, '4O4KVGsRuhdCCJOT4BfRCqcMnAa4zA4kUmWB3BSy', {
                        complete: true
                    })
                } catch (error) {
                    console.log('token已过期')
                    // token过期，生成新的token
                    const newToken = ctrl.getToken({})
                    // 将新token放入Authorization中返回给前端
                    ctx.res.setHeader('Authorization', newToken)
                }
            }
        }
    }
    return next()
})  

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
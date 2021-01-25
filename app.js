const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const appConf = require('./server/config/appConf')
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



app.use((ctx, next) => {
    // 登陆、注册不需要验证token
    if (['/login', '/register'].includes(ctx.url)) {
        return next()
    }
    if (ctx.header && ctx.header.authorization) {
        const parts = ctx.header.authorization.split(' ')
        if (parts.length === 2) {
            // 取出token
            const scheme = parts[0]
            const token = parts[1]
            if (/^Bearer$/i.test(scheme)) {
                try {
                    // jwt.verify方法验证token是否有效
                    jwt.verify(token, appConf.secret, {
                        complete: true
                    })
                } catch (error) {
                    ctx.throw(401, '授权已过期，请重新登陆')
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
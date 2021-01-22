const koaRouter = require('koa-router')
const router = koaRouter()
const userModel = require('../model/userModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.get('/user/:id', async ctx => {
    const id = ctx.params.id // 获取url里传过来的参数里的id
    const result = await userModel.getUserById(id) // 通过await “同步”地返回查询结果
    ctx.body = result // 将请求的结果放到response的body里返回
})

router.get('/userlist', async ctx => {
    ctx.body = await userModel.getUserList()
})

router.post('/login', async ctx => {
    const body = ctx.request.body // post过来的数据存在request.body里
    const userInfo = await userModel.getUserByName(body.account)
    if (userInfo != null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(body.password, userInfo.password)) {
            ctx.body = {
                success: false, // success标志位是方便前端判断返回是正确与否
                info: '密码错误！'
            }
        } else {
            const userToken = {
                account: userInfo.account,
                user_id: userInfo.user_id
            }
            const secret = 'vue-koa-demo' // 指定密钥
            const token = jwt.sign(userToken, secret) // 签发token
            ctx.body = {
                ...userInfo,
                success: true,
                token: token // 返回token
            }
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户不存在！' // 如果用户不存在返回用户不存在
        }
    }
})

router.post('/register', async ctx => {
    const body = ctx.request.body
    const userInfo = await userModel.getUserByName(body.account)
    if (userInfo == null) {
        let userInfo = await userModel.addUser({
            account: body.account,
            password: bcrypt.hashSync(body.password),
        })
        const userToken = {
            account: body.account,
            user_id: userInfo.user_id
        }
        const secret = 'vue-koa-demo' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
            success: true,
            account: userInfo.account,
            user_id: userInfo.user_id,
            token: token // 返回token
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户已存在！'
        }
    }
})

module.exports = router

const koaRouter = require('koa-router')
const router = koaRouter()
const userModel = require('../model/userModel.js')
const ctrl = require('../utils/ctrl')
const bcrypt = require('bcryptjs') // 对密码加密和验证

// 获取用户详情
router.get('/user/:id', async ctx => {
    const id = ctx.params.id // 获取url里传过来的参数里的id
    const result = await userModel.getUserById(id)
    ctx.body = result // 将请求的结果放到response的body里返回
})

// 获取用户列表
router.get('/userlist', async ctx => {
    ctx.body = await userModel.getUserList()
})

// 登陆
router.post('/login', async ctx => {
    const body = ctx.request.body // post过来的数据存在request.body里
    if (!body.account || !body.password) {
        ctx.throw(400)
    }
    const userInfo = await userModel.getUserByName(body.account)
    if (userInfo != null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(body.password, userInfo.password)) {
            ctx.body = {
                success: false,
                info: '密码错误！'
            }
        } else {
            let token = ctrl.getToken({
                user_id: userInfo.user_id,
                account: userInfo.account
            })
            ctx.body = {
                user_id: userInfo.user_id,
                account: userInfo.account,
                nickname: userInfo.nickname,
                city: userInfo.city,
                gender: userInfo.gender,
                account: userInfo.account,
                success: true,
                token: token
            }
        }
    } else {
        ctx.body = {
            success: false,
            info: '用户不存在！' // 如果用户不存在返回用户不存在
        }
    }
})

// 注册
router.post('/register', async ctx => {
    const body = ctx.request.body
    if (!body.account || !body.password) {
        ctx.throw(400)
    }
    const userInfo = await userModel.getUserByName(body.account)
    if (userInfo == null) {
        let userInfo = await userModel.addUser({
            account: body.account,
            password: bcrypt.hashSync(body.password),
        })
        let token = ctrl.getToken({
            user_id: userInfo.user_id,
            account: userInfo.account
        })
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

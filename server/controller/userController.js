const koaRouter = require('koa-router')
const router = koaRouter()
const userModel = require('../model/userModel.js')
const ctrl = require('../utils/ctrl')
const bcrypt = require('bcryptjs') // 对密码加密和验证

// 获取用户详情
router.get('/getUser', async ctx => {
    const sess = await ctrl.getSession(ctx)
    let userInfo = await userModel.getUserById(sess.user_id)
    ctx.body = {
        user_name: userInfo.user_name,
        user_id: userInfo.user_id,
    }
})

// 获取用户列表
router.get('/userlist', async ctx => {
    ctx.body = await userModel.getUserList()
})

// 登陆
router.post('/login', async ctx => {
    const body = ctx.request.body // post过来的数据存在request.body里
    if (!body.user_name || !body.password) {
        ctx.throw(400)
    }
    const userInfo = await userModel.getUserByName(body.user_name)
    if (userInfo != null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(body.password, userInfo.password)) {
            ctx.body = {
                success: false,
                info: '密码错误！'
            }
        } else {
            let token = ctrl.getToken({
                user_id: userInfo.user_id,
                user_name: userInfo.user_name
            })
            ctx.body = {
                user_id: userInfo.user_id,
                user_name: userInfo.user_name,
                nickname: userInfo.nickname,
                city: userInfo.city,
                gender: userInfo.gender,
                user_name: userInfo.user_name,
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
    if (!body.user_name || !body.password) {
        ctx.throw(400)
    }
    const userInfo = await userModel.getUserByName(body.user_name)
    if (userInfo == null) {
        let userInfo = await userModel.addUser({
            user_name: body.user_name,
            password: bcrypt.hashSync(body.password),
        })
        let token = ctrl.getToken({
            user_id: userInfo.user_id,
            user_name: userInfo.user_name
        })
        ctx.body = {
            success: true,
            user_name: userInfo.user_name,
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

const user = require('../model/index.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const addUser = async ctx => {
    const userInfo = ctx.request.body
    const result = await user.addUser(userInfo)
    ctx.body = {
        result
    }
}

const getUserInfo = async ctx => {
    const id = ctx.params.id // 获取url里传过来的参数里的id
    const result = await user.getUserById(id) // 通过await “同步”地返回查询结果
    ctx.body = result // 将请求的结果放到response的body里返回
}

const getUserList = async ctx => {
    ctx.body = await user.getUserList()
}

const postUserAuth = async function (ctx) {
    const data = ctx.request.body // post过来的数据存在request.body里
    const userInfo = await user.getUserByName(data.name)
    if (userInfo != null) { // 如果查无此用户会返回null
        if (!bcrypt.compareSync(data.password, userInfo.password)) {
            ctx.body = {
                success: false, // success标志位是方便前端判断返回是正确与否
                info: '密码错误！'
            }
        } else {
            const userToken = {
                name: userInfo.user_name,
                id: userInfo.id
            }
            const secret = 'vue-koa-demo' // 指定密钥
            const token = jwt.sign(userToken, secret) // 签发token
            ctx.body = {
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
}

module.exports = {
    addUser,
    getUserInfo,
    postUserAuth,
    getUserList,
}

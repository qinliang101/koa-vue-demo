const jwt = require('jsonwebtoken')
const appConf = require('../config/appConf')

module.exports = {
    getToken: user => {
        const token = jwt.sign(user, appConf.secret, {
            expiresIn:  '2h' // 2小时到期
         })
         return token
    },

    getSession: async ctx => {
        if (ctx.header && ctx.header.authorization) {
            const token = ctx.header.authorization 
            if (token) {
                payload = await jwt.verify(token.split(' ')[1], appConf.secret)
                return payload
            }
            return
        }
    }
}
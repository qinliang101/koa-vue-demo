const jwt = require('jsonwebtoken')
const secret = '4O4KVGsRuhdCCJOT4BfRCqcMnAa4zA4kUmWB3BSy'

module.exports = {
    getToken: user => {
        const token = jwt.sign(user, secret, {
            expiresIn:  '2h' // 2小时到期
         })
         return token
    },

    getSession: async ctx => {
        if (ctx.header && ctx.header.authorization) {
            const token = ctx.header.authorization 
            if (token) {
                payload = await jwt.verify(token.split(' ')[1], secret)
                return payload
            }
            return
        }
    }
}
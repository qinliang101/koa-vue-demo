const jwt = require('jsonwebtoken')

module.exports = {
    getToken: function(user) {
        console.log('+8888888888888+', user)
        const secret = '4O4KVGsRuhdCCJOT4BfRCqcMnAa4zA4kUmWB3BSy'
        const token = jwt.sign(user, secret, {
            expiresIn:  '2h' //秒到期时间
         })
         return token
    }
}
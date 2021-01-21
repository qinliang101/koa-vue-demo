const indexCtrl = require('../controller/index.js')
const koaRouter = require('koa-router')
const router = koaRouter()

router.get('/user/:id', indexCtrl.getUserInfo) // 定义url的参数是id
router.get('/userlist', indexCtrl.getUserList) // 定义url的参数是id
router.post('/addUser', indexCtrl.addUser)

module.exports = router

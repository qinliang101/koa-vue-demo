const Sequelize = require('sequelize') // 引入sequelize
let database_name = 'lemon'
let username = 'root'
let password = 'qinliang'
let host = 'localhost'
let port = '3306'

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const db = new Sequelize(database_name, username, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = db // 将demo暴露出接口方便Model调用
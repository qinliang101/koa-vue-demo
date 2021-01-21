const Sequelize = require('sequelize') // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const db = new Sequelize('koademo', 'root', 'qinliang', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = db // 将demo暴露出接口方便Model调用
const db = require('../config/db')
const { DataTypes } = require('sequelize')

const User = require('../schema/user')(db, DataTypes)

const addUser = async userInfo => {
    const result = await User.create(userInfo)
    return result
}

const getUserById = async id => { // 注意是async function 而不是function。对于需要等待promise结果的函数都需要async await。
    const userInfo = await User.findOne({ // 用await控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
        where: {
            id: id
        }
    })
    return userInfo // 返回数据
}

const getUserList = async () => {
    const userList = await User.findAll({
        where: {
            id: [1, 2]
        }
    })
    return userList
}

module.exports = {
    addUser,
    getUserById,
    getUserList,
}
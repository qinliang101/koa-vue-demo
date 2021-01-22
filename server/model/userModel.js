const db = require('../config/db')
const { DataTypes } = require('sequelize')
const User = require('../schema/user')(db, DataTypes)

const userModel = {}
userModel.getUserById = async user_id => { // 注意是async function 而不是function。对于需要等待promise结果的函数都需要async await。
    const userInfo = await User.findOne({ // 用await控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
        where: {
            user_id: user_id
        }
    })
    return userInfo.dataValues // 返回数据
}

userModel.getUserByName = async function (account) {
    const userInfo = await User.findOne({
        where: {
            account: account
        }
    })
    return userInfo
}

userModel.getUserList = async () => {
    const userList = await User.findAll({
        where: {
            id: [1, 2]
        }
    })
    return userList
}

userModel.addUser = async data => {
    return await User.create({
        account: data.account,
        password: data.password
    })
}

module.exports = userModel
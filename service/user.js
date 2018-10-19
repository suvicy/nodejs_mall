let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");
let config = require("../config");

/**
 * 用户注册
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */

async function regist(user) {

    // 根据用户名查询用户
    let result = await findByUsername(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`);
    }


    // 把密码进行加密
    // 参数1 : 原文
    // 参数2 : 盐
    console.log(user.password + " , " + user.username)
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    console.log("===register====" + user.password)
    //对角色重新赋值,避免攻击
    user.role = 0;

    //注册
    result = await User.create(user);
    result.password = "";
    return result;
}


/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8080/username
 * @param username 用户名
 * @returns {Promise<void>}
 */
async function deleteUserByUsername(username) {
    //据用户名检查用户是否存在
    await isExistByUsername(username);

    let result = await User.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败");
    }

}

// 根据用户名检查用户是否存在
async function isExistByUsername(username) {
    let result = await findByUsername(username);
    if (!result) {
        throw Error(`用户名为${username}的用户不存在`);
    }
}

/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8080/username
 * @param username : 用户名, zhangsan
 * @returns {Promise<*>}
 */
async function findByUsername(username) {
    return await User.findOne({username: username}).select("-password");
}

/**
 * 用户登录
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */

async function login(user) {
    // 根据用户名检查用户是否存在
    await isExistByUsername(user.username);
    // 用户有没有传递密码过来
    let password = user.password;
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空");
    }


    //加密密码
    console.log(user.password + " , " + user.username)
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    console.log("======login====" + user.password);
    //查询用户
    user = await User.findOne(user);
    //查询用户失败，说明用户名或密码错误
    if (!user) {
        throw Error("用户名或密码错误");
    }
    //查询成功，定义token数据
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };

    // 参数1 : 原文
    // 参数2 : 密钥
    // 对token进行加密
    let encryptedToken = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    return encryptedToken;
}

module.exports = {
    regist,
    login,
    deleteUserByUsername,
    findByUsername
}
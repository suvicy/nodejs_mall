let userService = require("../service/user");
require("../db");

async function testUser() {
    // 用户添加
        let user = {
            username: "lisi",
            password: "123",
            role: 100
        };
        user = await userService.regist(user);
        console.log(user)

    // 登录
    // let user = {
    //     username: "lisi",
    //     password: "123"
    //
    // };
    // user = await userService.login(user);
    //
    // console.log(user)

    await userService.deleteUserByUsername("lisi");

}

testUser();
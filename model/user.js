let mongoose = require("mongoose");

let schema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"用户名不能缺少"]
    },
    password:{
        type: String,
        require:[true,"密码不能少"]
    },
    age:{
        type:Number,
        min:[0,"年龄不能小于0"],
        max:[120,"年龄不能大于120"]
    },
    role:{
        type:Number,
        default:0       // 0是商家， 100是管理员
    },
    created: {
        type:Date,
        default: Date.now()
    }
});

module.exports=mongoose.model("user",schema);
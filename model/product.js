const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"商品名字不能少"],
        unique:true
    },
    price:{
        type: String,
        require: [true,"商品价格不能少"]
    },
    stock:{     //库存
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        require:[true,"分类id不能为空"]
    },
    description:{// 商品描述
        type:String,
    },
    inOnSale:{   //是否上架
        type:Boolean,
        default: true
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('product',schema)
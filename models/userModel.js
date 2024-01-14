const mongoose = require('mongoose');


//making user SCHEMA:
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone is required']
    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.jixXH_Els1MXBRmKFdMQPAHaHa?w=218&h=219&c=7&r=0&o=5&dpr=1.5&pid=1.7"
    }
}, {timestamps:true})


//export
module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('../libs/timeLib');

const UserSchema = new Schema({
    userId:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        index:true,
        required:true
    },
    userName:{
        type:String,
        unique:true,
        required:true,
        index:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        default:'normal'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetToken:{
        type:String,
        default:''
    },
    resetTokenExpires:{
        type:Date,
        default:time.now()
    },
    createdOn:{
        type:Date,
        default:time.now()
    },
    modifiedOn:{
        type:Date,
        default:time.now()
    }
});

module.exports = mongoose.model('User',UserSchema);
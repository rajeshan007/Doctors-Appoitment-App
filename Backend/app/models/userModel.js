const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    isDoctor : {
        type: Boolean,
        default: false
    },
    isAdmin:{ 
        type: Boolean,
        default: false
    },
    seenNotifications:{
        type: Array,
        default:[]
    },
    unseenNotifications:{
        type:Array,
        default:[]
    }
  

})


const User = mongoose.model('User', userSchema)

module.exports = User
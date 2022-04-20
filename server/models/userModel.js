const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    age:{
        type:String,
        trim:true,
        required: true
    },
    occupation:
    {
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true,
    }

},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;
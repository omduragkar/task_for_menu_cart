const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
module.exports.protect = expressAsyncHandler(async function(req, res, next){
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        const token = req.headers.authorization.split(" ")[1];
        let x = await jwtchecker(token);
        req.user = await User.findById(x.id).select("-password");
        if(!req.user){
            res.status(400).json({
                "message":"No such user exists!"
            })
        }else{

            next();
        }
    }else{
        res.status(400).json({
            "message":"user Logged Out"
        })
    }
})


async function jwtchecker(token){
    let x = await jwt.verify(token,process.env.secret_key);
    console.log(x)
    return x;
}
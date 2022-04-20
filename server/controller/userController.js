const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


module.exports.userLogin =  expressAsyncHandler(async (req, res)=>{
    const x = req.body;
    const user = await User.findOne({email:x.email}); 
    if(user && (await user.matchPassword(x.password)))
    {
        res.json({
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            dob: user.dob,
            token:  "Bearer " + createToken(user._id)
        });
    }
    else{
        res.status(400).json({
            "message":"Invalid Email or Password!"
        })
    }

})
// @desc POST /api/user/createlocal
module.exports.userCreate =  expressAsyncHandler(async (req, res)=>{
    const x = req.body;
    if((!x.email || !x.name || !x.password || !x.confirmpassword || !x.dob ) ){
        res.status(400).json({
            "message":"Please fill all the fields"
        })
    }else if(x.password.length <8 && x.confirmpassword.length < 8){
        res.status(400).json({
            "message":"Password length greater than or equal to 8 charachters"
        })

    }else{
        let m = x.dob.split("/");
        m = new Date().setFullYear(parseInt(m[2]),parseInt(m[1]), parseInt(m[0]));
        console.log(m)
        const user = await User.findOne({email:x.email}); 
        if(!user)
        {
            let user = await User.create({
                name:x.name,
                email: x.email,
                password: x.password,
                dob: m
            });
            if(user){
                
                res.json({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    token: "Bearer " + createToken(user._id),
                });
            }else{
                res.status(400).json({
                    message:"Error in creating User"
                })
            }
        }else{
            res.status(400).json({
                message:"User Already Exists!"
            })
        }
        
    }
    

})

module.exports.userfind = expressAsyncHandler(async (req, res)=>{
    // Query: /user?search=om&lastname="duragkar"
    console.log(req.query.search);
    const keyword = req.query.search ?{
        $or:[
            {name:{$regex:req.query.search, $options:"i"}},
            {email:{$regex:req.query.search, $options:"i"}}
        ]
    }
    :
    {};
    const users = await User.find(keyword)
    // .find({_id:{$ne:req.user._id}});
    res.send(users);

})

let createToken = function (id){
    return jwt.sign({id},process.env.secret_key,{
        expiresIn:"20d"
    })
    
}
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user.js');

exports.signup = async (req,res,next)=>{
    const{nickname,email,password,avatarPublicId} = req.body;
    const hashPassword = await bcrypt.hash(password,12);
    console.log(`avatarPublicId=${avatarPublicId}`);
    User.create({
        nickname,email,password:hashPassword,avatarPublicId
    })
    .then(()=>{
        const token = jsonWebToken.sign({nickname,email,password},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'});
        res.cookie('token',token/* ,{httpOnly:true} */);
        res.status(201).json({user:{nickname,email,password},token});
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(422).json({message:'Invalide data for user'})
    });
}

exports.signin = async (req,res,next)=>{
    const{nickname,password} = req.body;
    
    res.json({nickname:'Sasha',password:'12345'});
}
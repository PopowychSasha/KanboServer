const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user.js');

exports.signup = async (req,res,next)=>{
    const{nickname,email,password,avatarPublicId} = req.body;
    const hashPassword = await bcrypt.hash(password,12);
    
    const [user] = await User.findAll({
        where: {
            nickname: nickname
        }
    });

    if(user){
        res.status(409).json({message:'user already exists'});
        return;
    }

    User.create({
        nickname,email,password:hashPassword,avatarPublicId
    })
    .then(()=>{
        const token = jsonWebToken.sign({nickname,email,password},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'});
        res.cookie('token',token/* ,{httpOnly:true} */);
        res.status(201).json({user:{nickname,email},token});
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(422).json({message:'Invalide data for user'})
    });
}

exports.signin = async (req,res,next)=>{
    const{nickname,password} = req.body;
    const [user] = await User.findAll({
        where: {
            nickname: nickname
        }
    });

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(user.length===0 || !isPasswordValid){
        res.status(403).json({message:'Invalide nickname or password'});
    }
    else{
        const token = jsonWebToken.sign({user:{nickname:user.nickname,email:user.email}},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'});
        res.cookie('token',token);
        res.status(200).json({user:user,token});
    }
}
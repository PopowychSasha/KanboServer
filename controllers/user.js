const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
/* const User = require('../models/user.js'); */
const {Users} = require('../util/database');

exports.signup = async (req,res,next)=>{
    const{nickname,email,password,avatarPublicId} = req.body;
    const hashPassword = await bcrypt.hash(password,12);
    
    const [user] = await Users.findAll({
        where: {
            nickname: nickname
        }
    });

    if(user){
        res.status(409).json({message:'user already exists'});
        return;
    }
    Users.create({
        nickname,email,password:hashPassword,avatarPublicId
    })
    .then(()=>{
        const token = jsonWebToken.sign({nickname,email,password},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'});
        res.cookie('nickname%token',`${nickname}%${token}`/* ,{httpOnly:true} */);
        res.status(201).json({user:{nickname,email,avatarPublicId},token});
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(422).json({message:'Invalide data for user'})
    });
}

exports.signin = async (req,res,next)=>{
    const{nickname,password} = req.body;
    const [user] = await Users.findAll({
        where: {
            nickname: nickname
        }
    });

    if(!user){
        res.status(403).json({message:'Invalide nickname or password'});
        return;
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        res.status(403).json({message:'Invalide nickname or password'});
        return;
    }
    else{
        const token = jsonWebToken.sign({user:{nickname:user.nickname,email:user.email}},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'});
        res.cookie('nickname%token',`${user.nickname}%${token}`/* ,{httpOnly:true} */);
        res.status(200).json(user);
    }
}

exports.getAccount = async (req,res,next)=>{
    const nicknameFromCookie = req.get('Cookie').split('=')[1].split('%')[0];

    const [user] = await Users.findAll({
        where:{
            nickname:nicknameFromCookie
        }
    })
    res.json({
        nickname:user.nickname,
        email:user.email,
        avatarPublicId:user.avatarPublicId
    });
}

exports.logout = async (req,res,next)=>{
    res.clearCookie("nickname%token");
    res.status(200).json({message:'Cookies are deleted'});
}
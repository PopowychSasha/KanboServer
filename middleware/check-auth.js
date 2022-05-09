const jwt = require('jsonwebtoken');

exports.checkAuth = (req,res,next)=>{
    const token = req.get("Cookie").split("=")[1].split("%25")[1];
    
    if(!token){
        res.status(401).json({message:'User is un authorize'});
    }
    try{
        const isTokinValide = jwt.verify(token,'fg56!*&hu@');
        next();
    }catch(err){
        console.log(err.message);
        res.status(401).json({message:'User is an authorize'});
    }
}
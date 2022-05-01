const jwt = require('jsonwebtoken');

exports.checkAuth = (req,res,next)=>{
    const token = req.get("Cookie").split("=")[1].split("%25")[1];
    console.log(`token=-${token}`);
    console.log(`process.env.JWT_PRIVATE_KEY=${process.env.JWT_PRIVATE_KEY}`);
    if(!token){
        res.status(401).json({message:'User is un authorize'});
    }
    try{
        const isTokinValide = jwt.verify(token,'fg56!*&hu@');
        console.log(`isTokinValide=`);
        //console.log(isTokinValide);
        console.log(jwt.decode(token));
        next();
    }catch(err){
        console.log('AnAuthError(');
        res.status(401).json({message:'User is an authorize'});
    }
}
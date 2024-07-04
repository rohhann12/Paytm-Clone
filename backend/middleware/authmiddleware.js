const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config")

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    try {
        const tokenWithoutBearer = authHeader.split(' ')[1];
    const decode=jwt.decode(tokenWithoutBearer,JWT_SECRET)
    req.userId=decode.userId
    next();
    } catch (error) {
        console.log(error)
    }
}

module.exports={authMiddleware}
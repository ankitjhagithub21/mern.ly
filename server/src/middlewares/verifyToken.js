const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next)  => {

    try{
       
        const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message:"Token not provided.", success:false})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Invalid or expired token.", success:false})
        }
       
        req.userId = decoded.userId;    
        next()
    }catch(error){
        return res.status(401).json({message:"Unauthorized.", success:false})
    }
}

module.exports = verifyToken
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log("JWT token :",token)
        const isValid = jwt.verify(token,process.env.PRIVATE_KEY);
        next();
    }catch(error){
        console.log("JWT token : cannot found any")
        res.status(401).json({
            error : "Auth Failed"
        })
    } 
}

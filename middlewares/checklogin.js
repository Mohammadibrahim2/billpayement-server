const jwt =require("jsonwebtoken")

const checkLogin=(req,res,next)=>{

    const {authorization}=req.headers;
    try{
        const token= authorization.split(' ')[0];
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        const {name ,email}=decoded
        req.name=name;
        req.email=email
        next()
    }
    catch{
       
    next("authentication failure")
    
    }



}

module.exports=checkLogin
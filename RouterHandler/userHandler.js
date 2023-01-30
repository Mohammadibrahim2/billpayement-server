const mongoose =require("mongoose");
const express=require("express")
const bcrypt =require("bcrypt")

const jwt =require("jsonwebtoken")
const router=  express.Router()

const userSchema=require("../schemas/userSchema")

const User= new mongoose.model("User",userSchema)
// registration:-
router.post("/registration",async(req,res)=>{

    try{

  
    const hashedPassword =await bcrypt.hash(req.body.password,10);
    console.log(req.body)
    const newUser=new User({
     
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
      

    });
   
    await newUser.save();
    res.status(500).json({
        message:"Registration was successfull!"
    })  
} catch{
    res.status(200).json({
        message:"Registration faild"
    })
}

   
})
// loin:-
router.post("/login",async(req,res)=>{
    try{

  
    const user=await user.find({name:req.body.name});
    if(user&& user.length >0){
const isValidPassword =await bcrypt.compare(req.body.password,user[0].password)


if(isValidPassword){

//generate token
    const token =jwt.sign({
        name:user[0].name,
        email:user[0].email

    },process.env.JWT_SECRET,{
        expiresIn:'7d'})

        res.status(200).json({
            "access_token":token,
           "message":"log in successfull"
        })
    
}
else{
    res.status(401).json({
        "error":"Authentication failed"
    })
}
    }
    else{
        res.status(401).json({
            "error":"Authentication failed"
        })
    }

} catch{


    res.status(401).json({
        "error":"Authentication failed"
    })
}
})
module.exports=router;
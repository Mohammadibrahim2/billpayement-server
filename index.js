const express=require("express")
const dotenv =require("dotenv")
const cors=require('cors')
const mongoose = require('mongoose');
const port=process.env.PORT || 5000
const app=express()
const userHandler= require("./RouterHandler/userHandler")
const checkLogin =require("./middlewares/checklogin")
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

//


const bcrypt =require("bcrypt")

const jwt =require("jsonwebtoken")
const router=  express.Router()

const userSchema=require("./schemas/userSchema")

const User= new mongoose.model("User",userSchema)
//

app.use(cors())
dotenv.config()
app.use(express.json())
app.use("/user",userHandler)

// LmlBQuH0U089IjaF

const uri = "mongodb+srv://assesment:LmlBQuH0U089IjaF@cluster0.6ib4udf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


mongoose.set("strictQuery", true);
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => console.log('connection sucessful'))
  .catch((err)=>console.log(err));

async function run(){
    
        try{ 
            const userCollection=client.db("test").collection("users");
          const billCollection=client.db("assesment").collection("billcollections");
          
        
app.post("/registration",async(req,res)=>{
console.log(req.body)
 

  
    // const hashedPassword =await bcrypt.hash(req.body.password,10);
    console.log(req.body)
    const newUser=new User({
     
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      

    });
   
    const result =await newUser.save();
    if(result){
        res.status(500).json({
            message:"Registration was successfull!"
        }) 
    }
    


   
})

app.post("/login",async(req,res)=>{
  console.log(req.body)

  let result= await userCollection.find(
    {
        $or:[
            {name:{$regex:req.body.name} },
            {email:{$regex:req.body.email}},
          
        ]
    }
  )
  if(result){
    res.send(req.body.name)
  }
 


})
        
        app.get("/allbills",async(req,res)=>{
           const page=parseInt(req.query.page )
           const size=parseInt(req.query.size)
            const query={}
            
            const cursor= billCollection.find(query)
            const result=await  cursor.skip(page*size).limit(size).toArray()
            const count=await billCollection.estimatedDocumentCount()
            res.send({result,count})

        })
        
        app.get("/billsdata",async(req,res)=>{
            console.log(req.query.name)

          const phonnum=req.query.phone.toString()
            let result= await billCollection.find(
               
                {
                    $or:[
                        {name:{$regex:req.query.name} },
                        {email:{$regex:req.query.email}},
                        {phone:{$regex:phonnum}}
                    ]
                }
               
            ).toArray()

            const count=await billCollection.estimatedDocumentCount()
            res.send({result,count})

            

        })

        app.get("/update-billing/:id",async(req,res)=>{
            const id=req.params.id
           
            const query={_id: ObjectId(id)}
            
            const cursor= await billCollection.findOne(query)
          
            
            res.send(cursor)

        })
        app.put("/update-billing/:id",async(req,res)=>{
          
            const user=req.body
           const id=req.params.id
            console.log(user)
            const options = { upsert: true };
            const filter={_id: ObjectId(id)}
            
           const updateDoc={
            $set:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                payedAmount:user.payamount
            }
           }
           const result=await billCollection.updateOne(filter,updateDoc,options)
         res.send(result)
      
    })
 
 app.post("/add-billing",async(req,res)=>{
    const addingdata=req.body 
    console.log(addingdata)
   

    const result=await billCollection.insertOne(addingdata)

    res.send(result)
 })


        app.delete("/delete-billing/:id",async(req,res)=>{
          
                const id=req.params
                const query={_id: ObjectId(id)}
                
                const result= await billCollection.deleteOne(query)
             
                res.send(result)
              
          
        })
     
     

       
        
      }
      finally{

      }
    

  

}
run().catch(console.dir)




const errorHandler =(err,req,res,next)=>{
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({
        error:err
    })
}

app.use(errorHandler)



app.listen(port,()=>{
    console.log(port,"port")

})

// eYnpdgv0e8kBluGb
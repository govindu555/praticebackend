const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express();

const PORT=process.env.PORT || 4001

app.use(cors())

app.use(express.json())


const dotenv=require('dotenv')
dotenv.config()

mongoose.connect(process.env.mongodb_url)
const conn=mongoose.connection;

conn.once('open',()=>{
    console.log("mongodb is connecting")
})


const userschema= new mongoose.Schema({
    name:String,
    email:String
})

const usermodule=mongoose.model('users',userschema)

app.get('/getusers',(req,res)=>{
    usermodule.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/postdata",(req,res)=>{
    let b=new usermodule(req.body)
    let result=b.save()
    res.send(result)
})

app.delete("/delete/:id",async(req,res)=>{
   await  usermodule.findByIdAndDelete(req.params.id)
})

app.listen(PORT,()=>{
    console.log("server is running...")
})


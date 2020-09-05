const express=require('express')
const appRouter=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User',User)

appRouter.get('/',(req,res)=>{
    res.json({message:"Hello"})
})

appRouter.post('/post',(req,res)=>{
    console.log(req.body)
    res.json(req.body)

})

module.exports=appRouter
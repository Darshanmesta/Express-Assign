const express = require("express");
const appRouter = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

appRouter.post("/get", (req, res) => {
  const {_id}=req.body

  User.findById({_id}).then((data)=>{
      res.json(data)
  }).catch((err)=>{
      res.json({error:"Something went Wrong"})
  })
});

appRouter.post("/signup", (req, res) => {
  // res.json(req.body)
  const { name, password, email, phone, profession } = req.body;

  if (!name || !password || !email || !phone || !profession) {
    res.json({ message: "Please Enter all the values" });
  } else {
    User.findOne({ email: email }).then((data) => {
      if (data) {
        res.json({
          message: "Email Already Exists.Please Use a different one",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.json({ message: "Something went wrong" });
          } else {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                res.json({ message: "Something went wrong" });
              } else {
                const user = new User({
                  name,
                  password: hash,
                  email,
                  phone,
                  profession,
                });

                user
                  .save()
                  .then(() => {
                    res.json({ message: "Signup Succeeded" });
                  })
                  .catch((err) => {
                    res.json(err);
                  });
              }
            });
          }
        });
      }
    });
  }
});

appRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
      res.json({message:"Please Enter all the Credentials"})
  }

  else{
      User.findOne({email:email}).then((data)=>{
          if(!data){
              res.json({message:"Email/Password is Wrong"})
          }
          else{
              bcrypt.compare(password,data.password,(err,isMatch)=>{
                  if(err){
                      res.json({error:"Something went wrong"})
                  }
                  else{
                      if(isMatch){
                          res.json({message:"Login Succeeded"})
                      }
                      else{
                          res.json({message:"Email/Password is Wrong"})
                      }
                  }
              })
          }
      })
  }
});


appRouter.get('/home',(req,res)=>{
    User.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        res.json({message:"Something went wrong"})
    })
})

appRouter.put('/update',(req,res)=>{
  const{_id,name,email,phone,profession}=req.body

  User.findByIdAndUpdate({_id},{$set:{
    name,
    email,
    phone,
    profession

  }}).then(()=>{
    res.json({message:"Data Updation Success"})
  }).catch((err)=>{
    res.json({message:"Something went wrong"})
  })

  
})

appRouter.delete('/delete',(req,res)=>{
  const {_id}=req.body

  User.findByIdAndDelete({_id}).then(()=>{
    res.json({message:"Deletion Success"})
  }).catch((err)=>{
    res.json({message:"Deletion Failed"})
  })
})



module.exports = appRouter;

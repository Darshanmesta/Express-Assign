const express=require('express')
const app=express()
const PORT=process.env.PORT || 3100
const mongoose=require('mongoose')
const config=require('./conifg/config')

require('./model/model')
app.use(express.json())




mongoose.connect(config.DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Connection Succeeded')
},(err)=>{
    console.log('Connection Failed')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods","GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
  });
  app.use(require('./routes/routes'))

app.listen(PORT,()=>{
    console.log(`Server is Up and Running at PORT ${PORT}`)
})
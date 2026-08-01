const express = require("express")

const app = express()

app.use("/hello",(req,res)=>{
    res.send("Hello Hello hello")
})

app.use("/test",(req,res)=>{
    res.send("Hello from Test")
})

app.use("/hello",(req,res)=>{
    res.send("Hello Hello hello")
})

app.use("/",(req,res)=>{
    res.send("Hello from Server")
})

app.listen(3000,()=>{
    console.log("Server is successfully listening on PORT 3000");    
})
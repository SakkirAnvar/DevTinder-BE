const express = require("express")

const app = express()

app.get("/user",(req, res)=>{
    res.send({firstName: "Renuka", lastName:"Gavrani"})
})


app.listen(3000,()=>{
    console.log("Server is successfully listening on PORT 3000");    
})
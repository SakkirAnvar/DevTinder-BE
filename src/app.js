const express = require("express");

const app = express();

app.use("/", (err, req, res, next)=>{
   res.status(500).send("Something went wrong!!")
})

app.get("/getAllData", (req, res)=>{
    try{
        throw new Error("jhdsgf")
        res.send("All Data")
    }catch(err){
        res.status(500).send("Something went wrong")
    }
})

// app.get("/getAllData", (req, res)=>{
//     throw new Error("dhsgf")
//     res.send("All Data")
// })

//wildcard error handling
// app.use("/", (err, req, res, next)=>{
//     res.status(500).send("Something went wrong!!")
// })

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});

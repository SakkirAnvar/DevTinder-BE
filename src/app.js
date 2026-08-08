const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json())


//signup API
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    user.save();
    res.send("User Data Added Successfully");
  } catch (err) {
    res.starus(500).send("Failed to add user", err);
  }
});

//find one API /user
app.get("/user", async (req, res)=>{
  const userEmail = req.body.emailId
  console.log(userEmail);
  
  const user = await User.findOne({emailId: userEmail})
  try{
    if(!user){
      res.status(404).send("User not found!")
    }else{
      res.send(user)
    }
  }catch(err){
    res.send("Something went wrong")
  }
})

//delete the user /user
app.delete("/user", async (req, res)=>{
  const userId = req.body.userId
  try{
    const user = await User.findByIdAndDelete(userId)
    res.send("User deleted Successfully")
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})


// find all users - /feed
app.get("/feed", async (req, res)=>{
  const userEmail = req.body.emailId
  const user = await User.find({emailId: userEmail})
  try{
    if(!user){
      res.status(404).send("User not found!")
    }else{
      res.send(user)
    }
  }catch(err){
    res.send("Something went wrong")
  }
})

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully....");
    app.listen(3000, () => {
      console.log("Server is successfully listening on PORT 3000");
    });
  })
  .catch((err) => {
    console.error("Database Connection Unsuccessfull....", err);
  });

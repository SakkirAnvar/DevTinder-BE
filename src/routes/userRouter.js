const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender skills photoUrl"

//GET all the pending connection request of loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
  try{
    const loggedInUser = req.user

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status:"interested"
    }).populate("fromUserId", USER_SAFE_DATA)
    if(connectionRequests.length === 0){
      return res.json({message:"No Connection Requests Found!"})
    }

    res.json({message:"Connection Request Data Successfully fetched", connectionRequests})

    

  }catch(err){
    res.status(400).send("ERROR : "+ err.message)
  }
})

//GET the connection list of accepted status
userRouter.get("/user/connections", userAuth, async(req, res)=>{
  try{
    const loggedInUser = req.user

    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {toUserId: loggedInUser._id, status:"accepted"},
        {fromUserId:loggedInUser._id, status:"accepted"}
      ]
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

    const data = connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
      }
      return row.fromUserId
    })

    res.json({data})
  }catch(err){
    res.status(400).send("ERROR : "+err.message)
  }
})

// find all users except connectionRequest and self profile - /user/feed
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try{
    const loggedInUser = req.user
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit > 50 ? 50 : limit
    const skip = (page-1)*limit

    const connectionRequests = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedInUser._id}, {toUserId:loggedInUser._id}
      ]
    }).select("fromUserId toUserId")

    const hideUsersFromFeed = new Set()
    connectionRequests.forEach((req)=>{
      hideUsersFromFeed.add(req.fromUserId.toString(),
      hideUsersFromFeed.add(req.toUserId.toString())
    )
    })

    const users = await User.find({
      $and:[
        {_id : {$nin: Array.from(hideUsersFromFeed)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA).skip(skip).set(limit)


    

    res.send(users)
  }catch(err){
    res.status(400).send("ERROR : "+ err.message)
  }
});


//find one API /user
userRouter.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  console.log(userEmail);

  const user = await User.findOne({ emailId: userEmail });
  try {
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

//delete the user /user
userRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//update the user /user
userRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "password", "gender", "skills", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Skills not allowed more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err);
  }
});

module.exports = userRouter;

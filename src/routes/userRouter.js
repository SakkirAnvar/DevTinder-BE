const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

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

// find all users - /feed
userRouter.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  const user = await User.find({ emailId: userEmail });
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

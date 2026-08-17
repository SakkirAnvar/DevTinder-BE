const express = require('express');
const profileRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const {validateEditProfileData, validateForgotPassword} = require("../utils/validation")
const bcrypt = require("bcrypt")

// /profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request!")
    }

    const loggedInUser = req.user

    Object.keys(req.body).forEach((key)=>loggedInUser[key]= req.body[key])

    await loggedInUser.save()

    res.send(`${loggedInUser.firstName}, your profile updated successfully..`)
    

  }catch(err){
    res.status(400).send("ERROR : " + err.message)
  }
})

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
  try{
   await validateForgotPassword(req)
    const loggedInUser = req.user
    const {updatedPassword } = req.body
    const newPasswordHash = await bcrypt.hash(updatedPassword, 10)

    loggedInUser.password = newPasswordHash

    await loggedInUser.save()

    res.send(`${loggedInUser?.firstName}, your password updatred successfully..`)

  }catch(err){
    res.status(400).send("ERROR : "+ err.message)
  }
})

module.exports = profileRouter;
const express = require("express")
const authRouter = express.Router()
const {validateSignupData} = require("../utils/validation")
const {validateLoginData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const { userAuth } = require("../middlewares/auth")

//signup API
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrpt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    user.save();
    res.send("User Data Added Successfully");
  } catch (err) {
    res.status(500).send("Failed to add user" + err);
  }
});

//login API
authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //jwt
      const token = await user.getJWT();

      //cookie
      res.cookie("token", token);

      res.send("Login Successfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;
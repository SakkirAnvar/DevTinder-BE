const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sakkir",
    lastName: "Anvar",
    emailId: "sakkir@anvar.com",
    password: "Sakkir@123",
  });

  try {
    user.save();
    res.send("User Data Added Successfully");
  } catch (err) {
    res.starus(500).send("Failed to add user", err);
  }
});

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

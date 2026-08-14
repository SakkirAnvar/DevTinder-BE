const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/connectionRequest", userAuth,  async (req, res) => {
  const user = req.user;
  res.send(user.firstName + "Sending Connection Request");
});

module.exports = requestRouter;
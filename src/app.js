const express = require("express");

const app = express();

//GET /user => middlware => request handlers

app.use("/", (req, res, next) => {
  //Middleware
  console.log("Handling / route");
  next();
  // res.send("Response from / route")
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Handling /user route");
    //res.send("Response from /user route")
    next();
  },
  (req, res, next) => {
    console.log("Response 2");
    //res.send("Response 2")
    next();
  },
  (req, res, next) => {
    console.log("Response 3");
    res.send("Response 3");
  },
);

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});

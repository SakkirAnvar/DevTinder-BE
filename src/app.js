const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Route handler 1");
      // res.send("Response!")
      next();
    },
    (req, res, next) => {
      console.log("Route handler 2");
      next();
      //res.send("Response 2")
    },
  ],
  (req, res, next) => {
    console.log("Route handler 3");
    //res.send("Response 3")
    next();
  },
  [
    (req, res, next) => {
      console.log("Route handler 4");
      //res.send("Response 4")
      next();
    },
    (req, res, next) => {
      console.log("Route handler 5");
      res.send("Response 5");
      //next()
    },
  ],
);

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});

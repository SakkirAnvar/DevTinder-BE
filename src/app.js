const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("../middleware/auth");

app.use("/admin", adminAuth);

//checking auth using middleware
app.get("/admin/getAllData", (req, res) => {
  res.send("All the Data");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user");
});

//User Data with auth and without auth
app.get("/user/getAllUser", userAuth, (req, res) => {
  res.send("All User Data");
});

app.get("/user/login", (req, res) => {
  res.send("Login successfully");
});

//Authentication is done individually
// app.use("/admin/getAllData", (req, res) => {
//   const token = "xyzuu";
//   const isAdminAuthorized = token === "xyz";
//   if (isAdminAuthorized) {
//     res.send("All Data send");
//   } else {
//     res.status(401).send("Unauthorized Request!");
//   }
// });

// app.get("/admin/deleteUser",(req, res)=>{
//      const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (isAdminAuthorized) {
//     res.send("User Deleted");
//   } else {
//     res.status(401).send("Unauthorized Request!");
//   }
// })

app.listen(3000, () => {
  console.log("Server is successfully listening on PORT 3000");
});

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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

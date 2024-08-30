const express = require("express");
const { connectDB } = require("./connection");
const userRouter = require("./routes/user");

const app = express();

connectDB("mongodb://localhost:27017/userApp")
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.listen(3000, () => console.log("server is listening on 3000"));

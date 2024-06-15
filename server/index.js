const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect("mongodb+srv://kaizoku:duD4xu3SJXfc3aXF@cinema.8w7lmml.mongodb.net/?retryWrites=true&w=majority&appName=cinema", {
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.use((err, res, req, next) => {
  err.statuCode= err.statuCode || 500;
  err.status= err.status || 'error';
  res.status(err.statuCode).json({
    status: err.status,
    message: err.message
  })
})

app.use(
  cors({
    
  })
);
app.use(cookieParser());

app.use(express.json());


app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});
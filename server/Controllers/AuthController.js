const User = require("../Models/UserModel");
const createError= require('../util/appError')
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
exports.Signup = async (req, res, next) => {
  try {
    const { email, username, role, password, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    // const user = await User.create({ email, password, username, createdAt });
    // const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    // res
    //   .status(201)
    //   .json({ message: "User signed in successfully", success: true, user });
    // next();
    const hashedPassword= await bcrypt.hash(password,12)
    const newUser = await User.create({ email , password: hashedPassword ,role, username, createdAt });
     //assign token
    const token = createSecretToken(newUser._id);
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, token });
  } catch (error) {
    console.error(error);
  }
};

exports.login = async (req, res, next) =>{res.send('Login')};
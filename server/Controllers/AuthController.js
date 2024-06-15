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

    const hashedPassword= await bcrypt.hash(password,12)
    const newUser = await User.create({ email , password: hashedPassword ,role, username, createdAt });
     //assign token
    const token = createSecretToken(newUser._id);
    res
      .status(201)
      .json({ message: "User signed Up successfully", success: true, token });
  } catch (error) {
    console.error(error);
  }
};

exports.login = async (req, res, next) =>{
  try{
    const {email, password}= req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser ) return next(new createError("User not found!",404));
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(isPasswordValid){
      return  next(new createError("Incorrect Email or password",401)); 
    }
    const token = createSecretToken(existingUser._id);
    // res
    //   .status(200)
    //   .json({ 
    //     message: "User signed in successfully",
    //     success: true,
    //     token,
    //     user:{
         
    //     }
    //   });
     res
      .status(200)
      .json({message: "User signed in successfully",
           success: true,
           token,
           existingUser });
  } catch(error){res.send(error)}
};
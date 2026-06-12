import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import { genToken } from "../config/token.js";

// Creating EndPoint for regestering the User
export const userSignup = async (req, res) => {

  try {
    const { email,username,password ,role} = req.body;

  let check = await User.findOne({email});
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Existing user Found" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if(password.length < 8){
     return res.status(400).json({success:false, message:"Enter a strong password."})
  }

 const user = await User.create({
    username,
    email,
    password:hashedPassword,
    role,
    cartData:cart,
 })

 const token =await genToken(user._id);
 res.cookie("token", token,{
       httpOnly:true,
       secure: false,
       sameSite:"strict",
       maxAge: 7 * 24 * 60 * 60 * 1000
 })

  return res.status(200).json({success:true, message:"User registerd Successfully!",user})

  } catch (error) {
     console.log(error)
     res.status(500).json({
        success: false,
        message: "Server signup error"
     });  
  }
};


///Creating EndPoint For userLogin

export const userLogin = async (req,res) => {
    try {
         const {email,password} = req.body;
         
         //check if user exists
         const user = await User.findOne({email})
         if(!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password Invalid",
            });
        };
           
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({
                    success: false,
                    message: "Email or password Invalid",
                });
            }
    
    
            const token =await genToken(user._id);
            res.cookie("token", token,{
                httpOnly:true,
                secure: false,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(201).json({success:true, message:"login successful"},user)

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:error.message,
        });
    }
}


export const logout =  (req,res) => {
     try {
       res.clearCookie("token",{
             httpOnly:true,
                secure: false,
                sameSite:"strict",
        })
        return res.status(200).json({success:true, message:"Logour successful"})
     } catch (error) {
        return res.status(500).json({success:false, message:"logout error"})
     }
}

// get current user

export const getCurrentUser = async (req,res) => {
     try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({success:false, message:"No user available"})
        };

       
    return res.status(200).json({        
      success: true,                     
      user,
    });
     } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message:"getcurrentuser error"})
     }
}
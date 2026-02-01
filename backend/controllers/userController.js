import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

// Creating EndPoint for regestering the User
export const userSignup = async (req, res) => {

  try {
    const { email,username,password } = req.body;

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

 const user = new User({
    username: username,
    email:email,
    password:hashedPassword,
    cartData:cart,
 })


  await user.save();

  const data = {
    user:{
        id:user.id
    }
  }

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({success:true,token});

  } catch (error) {
     console.log(error)
     res.status(500).json({
        success: false,
        message: "Server error"
     });  
  }
};


///Creating EndPoint For userLogin

export const userLogin = async (req,res) => {
    try {
         const {email,password} = req.body;
         
         //check if user exists
         const user = await User.findOne({email});
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
            //Gennerate JWT
            const data = {
                user:{
                    id: user.id,
                },
            };

            const token = jwt.sign(data, process.env.JWT_SECRET,{
                expiresIn: "7d",
            });

            // Send response
            res.json({
                success: true,
                token,
                message: "logged in Successfully"
                
            });

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:error.message,
        });
    }
}

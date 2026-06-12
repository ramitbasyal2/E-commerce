
import express from "express";
const app = express();
import "dotenv/config";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import cors from "cors";
import ConnectDB from "./config/db.js";
import Product from "./models/productModel.js";
import path from "path";
import { userLogin, userSignup } from "./controllers/userController.js";
import User from "./models/userModel.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.router.js";
// import User from "./models/userModel.js";

app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
     origin: "https://e-commerce-1-x8dr.onrender.com",
     credentials:true
  }
));

const PORT = process.env.PORT || 8000;

//Connecting with mongoDb Database
await ConnectDB();

app.get('/', (req,res)=>{
  res.send("Server is live")
})

//  routes
app.use('/api/auth', authRouter)
app.use('/api/user',userRouter)

/* ================= IMAGE STORAGE ENGINE ================= */

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* ================= ADD PRODUCT ================= */

app.post("/addproduct", async (req, res) => {
  try {
    // Get last product
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const { name, image, category, new_price, old_price } = req.body;

    const product = new Product({
      id,
      name,
      image,
      category,
      new_price: Number(new_price),
      old_price: Number(old_price),
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= REMOVE PRODUCT ================= */

app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });

    res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= IMAGE UPLOAD ================= */

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

//creating API for getting all produucts
app.get('/allproducts', async (req,res)=>{
  let products = await Product.find({});
  console.log("All Products Fetched");
   res.send(products)
})

// Creating api for user signUP/Login
app.post('/signup',express.json(), userSignup);
app.post('/login',express.json(), userLogin);


// Creating Endpoint for newCollection data
 app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollecton fetched");
    res.send(newcollection)
    
 });

 //creating endPoint for popular in women section
 app.get('/popularinwomen', async (req,res)=>{
      let products = await Product.find({category: 'women'});
      let popular_in_women = products.slice(0,4);
      console.log("Popular in Women fetched");
      res.send(popular_in_women)
      
 })
 
 //creating middleware for creating the user
 const fetchUser = async (req,res,next)=>{
     const token = req.header('auth-token');
     if(!token){
        res.status(401).send({
          errors:"Please authenticate using valid token!"
        })
     }else{
      try {
          const data = jwt.verify(token,process.env.JWT_SECRET)
          req.user = data.user;   
          next()  
        } catch (error) {
         res.status(401).send({
          errors:"Please authenticate using a valid token"
         })
      }
     }
 }
 //creating Endpoint for adding products in cartData
 app.post('/addtocart',fetchUser, async (req,res)=>{
      console.log("Added", req.body.itemId);
     let userData = await User.findOne({_id:req.user.id});
     userData.cartData[req.body.itemId] += 1;
     await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
       res.send('Added')
    })

 // Creating API Endpoint for removing the data from cartdata   

  app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("removed", req.body.itemId);
     let userData = await User.findOne({_id:req.user.id});
     if( userData.cartData[req.body.itemId]>0)
     userData.cartData[req.body.itemId] -= 1;
     await User.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
       res.send('removed')
    })

// // Creating endpoint to get cartData
// app.post('/getcart', fetchUser,async(req,res)=>{
//    console.log("GetUser");
//    let userData = await User.findOne({_id:req.user.id});
//    res.json(userData.cartData);
   
// })
// Creating endpoint to get cartData
app.post('/getcart', fetchUser, async (req, res) => {
  try {
    console.log("GetUser");

    const userData = await User.findOne({_id:req.user.id});

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      cartData: userData.cartData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});


//API creation
app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${PORT}`);
  } else {
    console.log("Error", error);
  }
});

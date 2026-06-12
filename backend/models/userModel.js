import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
     type:String,
     enum:["Customer","Admin"],
     default: "Customer"
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;

import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignUp from "./Pages/LoginSignUp";
import Footer from "./Components/Footer/Footer";
import men_banner from './assets/banner_mens.png';
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'
import { Toaster } from "react-hot-toast";
import useGetCurrentUser from "./customHooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import Layout from "./Components/Layout";
import Admin from "./Pages/Admin";
import AdminPanel from "./Components/AdminPanel";
export const serverUrl = import.meta.env.VITE_SERVER_URL

const App = () => {
  useGetCurrentUser();

  const {userData} = useSelector(state=> state.user);
  console.log("from app", userData)

  return (
    <div>
 
       <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kids" />} />
          <Route path="/product" element={<Product/>}>
            <Route path="/product/:productId" element={<Product/>} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<LoginSignUp />} />
          {/* admin below */}
          
          {/* <Route path="/admin" element={<AdminPanel/>}>
                <Route path="/admin" element={<Admin/>} />
                <Route path="/admin/addproduct" element={<AddProduct/>} />
                 <Route path='/admin/listproduct' element={<ListProduct/>} />
          </Route> */}
          <Route path="/admin" element={<Admin/>} />
        </Routes>
       
    </div>
  );
};

export default App;

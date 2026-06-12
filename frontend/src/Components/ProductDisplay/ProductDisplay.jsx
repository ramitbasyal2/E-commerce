import React, { useContext } from "react";
import star_icon from '../../assets/star_icon.png';
import star_dull_icon from '../../assets/star_dull_icon.png'
// import './ProductDisplay.css'
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
const { product } = props;
  const {  addToCart} = useContext(ShopContext)

  return (
    <div className="w-full h-screen bg-gray-100 py-10">
     <div className="max-w-7xl mx-auto">
         <div className="flex flex-col lg:flex-row gap-8">
           <div className="flex gap-3 flex-col lg:flex-row items-center">
        <div className="flex lg:flex-col gap-1 lg:gap-3">
          <img className="w-[80px] lg:w-[150px] h-[90px] lg:h-[140px] object-cover" src={product.image} alt="" />
          <img  className="w-[80px] lg:w-[150px] h-[90px] lg:h-[140px] object-cover" src={product.image} alt="" />
          <img  className="w-[80px] lg:w-[150px] h-[90px] lg:h-[140px] object-cover" src={product.image} alt="" />
          <img  className="w-[80px] lg:w-[150px] h-[90px] lg:h-[140px] object-cover" src={product.image} alt="" />
        </div>
        <div className="w-[330px] lg:w-[450px] h-[400px] lg:h-[600px]">
          <img className="w-full h-full object-cover" src={product.image} alt="" />
        </div>
      </div>
      <div className="flex-1 px-8 mt-6">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <div className="flex">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>122</p>
        </div>
        <div className="flex gap-2 mt-3">
            <div className="line-through text-gray-400">${product.old_price}</div>
             <div className="font-bold text-[18px]">${product.new_price}</div>
        </div>
        <div className="mt-12 text-gray-600 w-[70%] flex flex-wrap">
            A lightweight, usually knitted, pullovver shirt, close-fitting and a round neckline 
            and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="mt-4">
            <h1 className="text-xl font-medium">Select Size</h1>
            <div className="flex gap-4 mt-2">
                <div className="border px-4 py-2 bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer">S</div>
                <div className="border px-4 py-2 bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer">M</div>
                <div className="border px-4 py-2 bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer">L</div>
                <div className="border px-4 py-2 bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer">XL</div>
                <div className="border px-4 py-2 bg-gray-100 border-gray-300 hover:bg-gray-200 cursor-pointer">XXL</div>
            </div>
        </div>
        <button className="mt-6 border px-4 py-3 w-[50%] bg-amber-500 border-none cursor-pointer
         hover:bg-amber-600 mb-6" onClick={()=> addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span>Womwn, T-shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
      </div>
         </div>
     </div>
    </div>
  );
};

export default ProductDisplay;

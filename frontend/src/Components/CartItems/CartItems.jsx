import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";

const CartItems = () => {
  const { cartItems, removeFromCart, all_products, getTotalCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full bg-gray-200 px-4 py-4 lg:px-16">
      <div className="hidden lg:block">
         <div className="cartitems-format-main gap-2 md:gap-8 lg:gap-10 text-xs md:text-[16px] z-10">
        <p className="">Products</p>
        <p className="ml-6">Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
     {all_products?.map((e)=>{
        if(cartItems[e.id] > 0)
        {
        return <div key={e.id}>
        <div className="cartitems-format cartitems-format-main">
          <img src={e.image} alt="" className="carticon-product-icon" />
          <p className="text-xs md:text-[16px]">{e.name}</p>
          <p>₹{e.new_price}</p>
          <button className="cartitems-quantity">{cartItems[e.id]}</button>
          <p>₹{e.new_price*cartItems[e.id]}</p>
          <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
        </div>
        <hr />
      </div>
        }
        return null
     })}
      </div>

     {/* smaller devices */}
      <div className=" lg:hidden w-full bg-gray-200 px-2 py-4 mt-4">
          <div className="flex items-center justify-between">
             <h1>My Cart</h1>
          </div>
                
            <div className="w-full">
             {all_products?.map((e)=>{
        if(cartItems[e.id] > 0)
        {
        return <div key={e.id}>
        <div className=" flex gap-2 items-center justify-between px-2">
             <div className="flex items-center gap-2">
               <div className=" w-18 h-21 bg-gray-500 mt-4 mb-2">
                 <img className="w-full h-full object-cover" src={e.image} alt="" />    
                 </div>
                 <div>
                  <span className="text-gray-600">₹{e.new_price}</span>
                   <p className="text-xs md:text-[16px]">{e.name}</p>
                   <p><span className="font-medium">Total: </span>₹{e.new_price*cartItems[e.id]}</p>
                  </div> 
             </div> 
                 <div className="flex flex-col gap-8">
                     <div className="flex items-center justify-between"><p className="text-gray-500 text-xs">Quantity: {cartItems[e.id]}</p></div>
                  <img title="Remove Product" className="w-3 hover:scale-110 hover:text-black cursor-pointer" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                  </div>
             
        </div>
        <hr />
      </div>
        }
        return null
     })}
            </div>
      </div>



     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="mt-10 md:mt-20 px-2">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                </div>
            </div>
            <button className="bg-orange-400 px-2 md:px-4 py-3 text-[14px] md:text-[16px] rounded-md cursor-pointer mt-3 mb-3">PROCEED TO CHECKOUT</button>
        </div>
        <div className="mt-10 md:mt-20 flex flex-col mb-10 md:mb-25">
            <p className="font-medium mb-6">If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder="Promo code" className="py-2 px-2 outline-none" />
                <button className="border px-6 py-2 bg-black text-white cursor-pointer">Submit</button>
            </div>
        </div>
     </div>
    </div>
  );
};

export default CartItems;

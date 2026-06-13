import React, { createContext, useState, useEffect } from "react";
// import all_products from "../assets/all_products";

export const ShopContext = createContext(null);

//for add to cart functionality default cart
  const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++ ){
        cart[index] = 0 //initializing productid with 0
    }
    return cart;
  }


const ShopContextProvider = (props) => {

  //to import the data from api allproducts adminpanel
   const [all_products, setAll_product] = useState([])
     
  // Cart Sections
   const [cartItems, setCartItems] = useState(getDefaultCart())
 
   useEffect(()=>{
      fetch(`${import.meta.env.VITE_SERVER_URL}/allproducts`)
      .then((response)=> response.json())
      .then((data)=> setAll_product(data))
         
      if(localStorage.getItem('auth-item')){
        fetch(`${import.meta.env.VITE_SERVER_URL}/getcart`,{
          method:'POST',
          headers:{
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body: "",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data))
      }

   },[])

  //  addtocart
  const addToCart = (itemId) => {
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) //providing our itemId and their value
     if(localStorage.getItem('auth-token')){
      fetch(`${import.meta.env.VITE_SERVER_URL}/addtocart`,{
        method: 'POST',
          headers: {
          Accept:'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"itemId":itemId}),
      })
      .then((response)=> response.json())
      .then((data)=> console.log(data)
      )
     }
    
  }
  useEffect(() => {
  if (localStorage.getItem('auth-token')) {
    fetch(`${import.meta.env.VITE_SERVER_URL}/getcart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data.cartData ?? data));
  }
}, []);


  //removeFromCart
   const removeFromCart = (itemId) => {
    // setCartItems((prev)=> ({...prev,[itemId]:prev[itemId]-1}))
    setCartItems((prev)=>({...prev, [itemId]: Math.max(prev[itemId] -1, 0)})) // <-- here till frontend
      if(localStorage.getItem('auth-token')){
        fetch(`${import.meta.env.VITE_SERVER_URL}/removefromcart`,{
          method:'POST',
          headers:{
            Accept: 'application/json',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"itemId":itemId}),
        }).then((response)=> response.json())
        .then((data)=> console.log(data))
      }
   }

   const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(let item in cartItems)
          {
          if(cartItems[item]>0)
            {
            let itemInfo = all_products.find((product)=>product.id === Number(item))
            totalAmount += itemInfo.new_price * cartItems[item]
          }
        }
          return totalAmount
   }
  
   const getTotalCartItems = ()=>{
      let totalItem = 0;
       for(const item in cartItems)
        {
          if(cartItems[item]>0){
            totalItem += cartItems[item];
          }
       }
       return totalItem
   } 

     const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };
 
 
     return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

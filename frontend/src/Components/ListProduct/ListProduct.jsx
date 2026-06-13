import React, { useState,useEffect } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'


const ListProduct = () => {

 const [allproducts, setAllProducts] = useState([])
 
 const fetchInfo = async ()=>{
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/allproducts`)
    .then((res)=>res.json())
    .then((data)=> setAllProducts(data))
 }

 useEffect(()=>{
   fetchInfo()
 },[])

const remove_product = async (id)=>{
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/removeproduct`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id})
    })
    await fetchInfo()
}

  return (
    <div className='list-product px-4 py-6 shadow-2xl'>
         <div className='hidden lg:block'>
             <h1>All Products List</h1>
         <div className="listproduct-format-main mt-32 md:mt-4 text-xs md:text-[14px] mb-4 font-medium ">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
         </div>
         <div className='listproduct-allproducts flex flex-col gap-2'>
            <hr />
            {allproducts.map((product,index)=>{
               return <> <div key={index} className="listproduct-format-main listproduct-format g">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                          <p>{product.name}</p>
                          <p>${product.old_price}</p>
                          <p>${product.new_price}</p>
                          <p>{product.category}</p>
                          <img onClick={()=> remove_product(product.id)} src={cross_icon} alt="" className="listproduct-remove-icon" />
               </div>  
               <hr />
               </>
            })

            } 
         </div>

         </div>
         {/* smaller devide */}
         <div className='w-full mt-32 md:mt-4 '>
             <div className=" lg:hidden bg-gray-200 px-2 py-4 mt-4">
                      <div className="flex items-center justify-between">
                         <h1 className='flex mx-auto'>All Products List</h1>
                      </div>
                            
                        <div className="w-full">
                         {allproducts?.map((e,index)=>{
                    
                    return <div key={index}>
                    <div className=" flex gap-2 items-center justify-between px-2">
                         <div className="flex items-center gap-2">
                           <div className=" w-18 h-21 bg-gray-500 mt-4 mb-2">
                             <img className="w-full h-full object-cover" src={e.image} alt="" />    
                             </div>
                             <div>
                              <span className="text-gray-600">₹{e.new_price}</span>
                               <p className="text-xs md:text-[16px]">{e.name}</p>
                                <span className="text-gray-600 line-through">₹{e.old_price}</span>
                              </div> 
                         </div> 
                             <div className="cursor-pointer hover:scale-125">
                              <img onClick={()=> remove_product(e.id)} src={cross_icon} alt="" />
                  
                              </div>
                         
                    </div>
                    <hr />
                  </div>
                    return null
                 })}
                        </div>
                  </div>
            
         </div>
    </div>
  )
}

export default ListProduct
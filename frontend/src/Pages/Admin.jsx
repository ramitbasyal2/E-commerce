import React, { useState } from 'react'
import AddProduct from '../Components/AddProduct/AddProduct'
import {Link, useNavigate} from 'react-router-dom'
// import add_product_icon from '../../assets/Product_cart.svg'
// import list_product_icon from '../../assets/Product_list_icon.svg' 
import { useSelector } from 'react-redux'
import ListProduct from '../Components/ListProduct/ListProduct'
import { MdArrowBackIosNew } from "react-icons/md";

const Admin = () => {
    const navigate = useNavigate()
     const {userData} = useSelector(state=> state.user)
     const [addProduct, setAddProduct] = useState(true);
     const [listProduct, setListProduct] = useState(false)

  return (
    <div className='w-full h-screen bg-gray-100 grid grid-cols-1 md:grid-cols-4 gap-2'>
       <div className='col-span-1'>
         <div className='md:h-screen w-full md:w-[25%] py-4 fixed left-0 top-0
     bg-gray-200 flex md:flex-col flex-row md:justify-between'>
          <div className='flex md:flex-col flex-row flex-wrap items-center gap-2 px-3'>
            <Link onClick={()=> {setAddProduct(!addProduct); setListProduct(false)}} style={{textDecoration:"none"}}>
            <div className="flex gap-2 items-center bg-gray-100 p-4">
                 {/* <img src={add_product_icon} alt="" /> */}
                 <p>Add Product</p>
            </div>
          
          </Link>
           <Link onClick={()=> {setListProduct(!listProduct);setAddProduct(false)}} style={{textDecoration:"none"}}>
            <div className="flex gap-2 items-center bg-gray-100 p-4">
                 {/* <img src={list_product_icon} alt="" /> */}
                 <p>Product List</p>
            </div>
          
          </Link>
          </div>
        
          <div className='flex items-center gap-2 md:justify-between px-4'>
             <div onClick={()=> navigate('/')} className='w-10 h-10 rounded-full border items-center justify-center flex cursor-pointer hover:bg-gray-100'><MdArrowBackIosNew /></div>
                <div className='flex gap-3 items-center w-[240px]'><p className='text-black text-xl'>{userData?.username}</p>
                <div className='w-10 h-10 bg-black rounded-full text-white flex items-center justify-center text-xl'>{userData?.username.slice(0,1).toUpperCase()}</div></div>
          </div>
    </div>
       </div>
       { addProduct && <div className='col-span-3 h-screen'>
           <AddProduct/>
         </div>}
          { listProduct && <div className='col-span-3'>
           <ListProduct/>
         </div>}
    </div>
  )
}

export default Admin
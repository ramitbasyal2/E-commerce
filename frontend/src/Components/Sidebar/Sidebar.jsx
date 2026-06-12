import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg' 
import { useSelector } from 'react-redux'

const Sidebar = () => {
 
  const {userData} = useSelector(state=> state.user)
   
   
  return (
    <div className='md:h-screen h-50 w-full md:w-[25%] gap-6 py-4 fixed left-0 top-0
     bg-gray-200 flex md:flex-col flex-row justify-between'>
          <div>
            <Link to={'/admin/addproduct'} style={{textDecoration:"none"}}>
            <div className="flex gap-2 items-center bg-gray-100 p-4">
                 <img src={add_product_icon} alt="" />
                 <p>Add Product</p>
            </div>
          
          </Link>
           <Link to={'/admin/listproduct'} style={{textDecoration:"none"}}>
            <div className="flex gap-2 items-center bg-gray-100 p-4 mt-4">
                 <img src={list_product_icon} alt="" />
                 <p>Product List</p>
            </div>
          
          </Link>
          </div>
        
          <div className='flex items-center gap-2 p-4'>
                <p className='text-black text-xl'>{userData?.username}</p>
                <div className='w-10 h-10 bg-black rounded-full text-white flex items-center justify-center text-xl'>{userData?.username.slice(0,1).toUpperCase()}</div>
          </div>
    </div>
  )
}

export default Sidebar
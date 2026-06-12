import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { serverUrl } from '../../App'
import { useSelector } from 'react-redux'
import { FaUserAstronaut } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {

  const {userData} = useSelector(state=> state.user);

    const [menu, setMenu] = useState("Shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const navigate = useNavigate()
    const [state, setState] = useState(false)
    const [showMenu, setShowmenu] = useState(false);


    const logout = async () => {
     try {
        const {data} = await axios.delete(`${serverUrl}/api/auth/logout`,
          {withCredentials:true})
          navigate('/');
          toast.success("Logout successful")
        
     } catch (error) {
       console.log(error.message,"logout error")
          toast.error(error.response?.data.message)
     }
  }


  return (
    <div>
      {/* for large device */}
      <div className=' lg:flex w-full flex items-center justify-between py-3 px-4 md:px-8'>
      <div onClick={()=> navigate('/')} className='flex items-center md:text-xl lg:text-2xl font-bold'>
          <img src={logo} alt="" className='w-10 md:w-16 ' />
          <p>ShopX</p>
      </div>
      <ul className='flex gap-6 hidden lg:flex '>
        <li onClick={()=> setMenu("Shop")}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "Shop" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Men")}> <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu === "Men" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Women")}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "Women" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Kids")}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === "Kids" ? <hr /> : '' } </li>
      </ul> 
           <div className='nav-login-cart'>

            <div className='hidden lg:block' onClick={()=> setState(!state)}>
                 {userData? <div className='relative bg-black w-12 h-12 border-3 flex items-center justify-center border-amber-600
                  rounded-full text-white text-xl'>{userData?.username.slice(0,1).toUpperCase()}</div>:
                  <div className='w-12 h-12  border-3 flex items-center justify-center border-amber-600 rounded-full'><FaUserAstronaut size={22} />  </div>

                 }

              {state && <div className='border-3 w-34 gap-2 flex flex-col absolute top-[80px] text-center rounded-xl bg-black text-white border-white'>
                  {userData?.role === 'Admin' &&
                    <p onClick={()=> navigate('/admin')} className='bg-gray-800 py-2 hover:bg-gray-700 rounded-xl'>Admin Panel</p>}
                 {!userData ? <p onClick={()=> navigate('/login')} className='bg-green-800 py-2 hover:bg-green-700 rounded-xl'>Login</p>
                           : <p onClick={logout} className='bg-[#f70d0de1] py-2 hover:bg-red-700 rounded-xl'>Logout</p>}
              </div>}

            </div>
            
            <div className='lg:hidden' onClick={()=> setShowmenu(!showMenu)}><RiMenu3Fill size={30} className=' cursor-pointer' /></div>
            <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
           </div>
            
    </div>
    {/* for small device */}
    <div>
       {showMenu && <div className='lg:hidden z-10 fixed top-0 left-0 bottom-0 right-0 bg-gray-100 items-center justify-between py-3 px-4 md:px-8'>
      <div onClick={()=> navigate('/')} className='w-full flex items-center justify-between gap-2'>
           <span></span>
          <div className='flex items-center text-xl font-bold'><img src={logo} alt="" />
          <p>ShopX</p></div>
          <RxCross1 onClick={()=> setShowmenu(false)} size={26} className='hover:scale-110 cursor-pointer' />
      </div>
      <hr className='mt-4 mb-16 border' />
      <ul className='flex  flex-col items-center gap-6 text-2xl'>
        <li onClick={()=> {setMenu("Shop");setShowmenu(false)}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "Shop" ? <hr className='w-[100%] ' /> : '' } </li>
        <li onClick={()=> {setMenu("Men");setShowmenu(false)}}> <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu === "Men" ? <hr className='w-[100%]' /> : '' } </li>
        <li onClick={()=> {setMenu("Women");setShowmenu(false)}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "Women" ? <hr className='w-[100%]' /> : '' } </li>
        <li onClick={()=> {setMenu("Kids");setShowmenu(false)}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === "Kids" ? <hr className='w-[100%]' /> : '' } </li>
      </ul> 
           <div className='nav-login-cart flex items-center justify-center mt-22 '>

            <div onClick={()=> setState(!state)}>
                 {userData? <div className='relative bg-black w-12 h-12 border-3 flex items-center justify-center border-amber-600 rounded-full text-white text-xl'>{userData?.username.slice(0,1).toUpperCase()}</div>:
                  <div className='w-12 h-12  border-3 flex items-center justify-center border-amber-600 rounded-full'><FaUserAstronaut size={22} />  </div>

                 }

              {state && <div className='z-10 border-3 w-34 gap-2 flex flex-col absolute top-[80px] text-center rounded-xl bg-black text-white border-white'>
                  {userData?.role === 'Admin' &&
                    <p onClick={()=> navigate('/admin')} className='z-10 bg-gray-800 py-2 hover:bg-gray-700 rounded-xl'>Admin Panel</p>}
                 {!userData ? <p onClick={()=> navigate('/login')} className='bg-green-800 py-2 hover:bg-green-700 rounded-xl'>Login</p>
                           : <p onClick={logout} className='bg-[#f70d0de1] py-2 hover:bg-red-700 rounded-xl'>Logout</p>}
              </div>}

            </div>  
            <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
           </div>
            
    </div>}
    </div>
    </div>
  )
}

export default Navbar
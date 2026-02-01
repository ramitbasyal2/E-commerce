import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import {toast} from 'react-hot-toast'

const Navbar = () => {

    const [menu, setMenu] = useState("Shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const navigate = useNavigate()

  return (
    <div className='navbar'>
      <div onClick={()=> navigate('/')} className='nav-logo'>
          <img src={logo} alt="" />
          <p>ShopX</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=> setMenu("Shop")}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "Shop" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Men")}> <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu === "Men" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Women")}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "Women" ? <hr /> : '' } </li>
        <li onClick={()=> setMenu("Kids")}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === "Kids" ? <hr /> : '' } </li>
      </ul> 
           <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')
            ? <button onClick={()=> {localStorage.removeItem('auth-token');
              toast.success("Logged Out Successfully !!")
              setTimeout(()=>{
                 window.location.replace('/')
              },1500);}}>Logout</button> 
             :  <button><Link style={{textDecoration: 'none'}} to='/login'>Login</Link></button>}
            <Link style={{textDecoration: 'none'}} to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
           </div>
    </div>
  )
}

export default Navbar
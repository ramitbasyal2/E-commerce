import React from 'react'
import footer_logo from '../../assets/logo_big.png'
import instagram_icon from '../../assets/instagram_icon.png'
import pinterest_icon from '../../assets/pintester_icon.png'
import whatsapp_icon from '../../assets/whatsapp_icon.png'



const Footer = () => {
  return (
    <div className='w-full h-[60vh] flex items-center justify-center flex-col gap-8 bg-gray-300'>
         <div className=" w-[90px] md:w-[130px] flex items-center gap-1">
            <img className='w-full' src={footer_logo} alt="footer-logo" />
            <p className='text-xl md:text-3xl text-gray-900'>ShopXXXXXXXXXXXXX</p>
            
         </div>
         <ul className='flex gap-4 font-medium '>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
         </ul>
         <div className="flex gap-6 flex-wrap">
            <div className='border p-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>
               <img src={instagram_icon} alt="" />
            </div>
             <div className='border p-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>
               <img src={pinterest_icon} alt="" />
            </div>
             <div className='border p-2 border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer'>
               <img src={whatsapp_icon} alt="" />
            </div>
         </div>
         <div className="footer-copyright">
            <hr className='border-2 mb-4' />
            <p className=' mb-4'>Copyright &copy;2026 All Right Reserved</p>
         </div>
    </div>
  )
}

export default Footer
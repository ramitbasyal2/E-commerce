import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='px-2 py-10 md:PX-4 md:py-15 bg-gradient-to-r from-purple-100 to-gray-200'>
        <div className='W-[90%] px-2 md:w-[80%] h-[40vh] bg-gradient-to-r from-purple-200 via-blue-200 to-gray-300
         max-w-7xl mx-auto flex flex-wrap flex flex-col gap-[30px] items-center justify-center '>
          <h1 className='text-[18px] md:text-[30px] lg:text-[40px] font-bold'>Get Exclusive Offers On Your Email</h1>
        <p className='text-[14px]'>Subscribe to our newsletter and stay updated</p>
        <div>
          <div className='w-[90%] flex border bg-gray-100 px-4 rounded-[50px]'> 
             <input className=' py-1 outline-none' type="email" placeholder='Your Email id' />
           <button className='bg-black text-white px-8 flex items-center justify-center cursor-pointer -mr-4 py-3 rounded-[50px]'>Subscribe</button>
          </div>
            
         </div>
        </div>
    </div>
  )
}

export default NewsLetter
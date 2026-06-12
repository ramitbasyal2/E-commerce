import React from 'react'
import exclusive_image from '../../assets/exclusive_image.png'

const Offer = () => {
  return (
    <div className='w-full py-10 px-6 md:px-10 bg-gradient-to-r from-amber-50 via-pink-100 to-purple-100'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10'>

        {/* ── Left: Text Content ── */}
        <div className='flex flex-col items-center md:items-end text-center md:text-left space-y-4'>
          <h1 className='text-4xl md:text-7xl font-bold'>Exclusive</h1>
          <h1 className='text-2xl md:text-7xl font-medium'>Offers For You</h1>
          <p className='text-gray-500 text-sm md:text-base tracking-widest uppercase'>
            Only on best sellers products
          </p>
          <button className='mt-2 px-6 py-3 text-base md:text-xl font-medium cursor-pointer rounded-full bg-orange-400 hover:bg-orange-500 transition-colors duration-200'>
            Check Now
          </button>
        </div>

        {/* ── Right: Image ── */}
        <div className='hidden md:block md:w-1/2 flex justify-center'>
          <img
            className=' max-w-sm md:max-w-full object-contain'
            src={exclusive_image}
            alt="Exclusive offer"
          />
        </div>

      </div>
    </div>
  )
}

export default Offer
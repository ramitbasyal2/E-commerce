import React, { useEffect, useState } from 'react'
import './Popuar.css'
// import data_product from '../../assets/data'
import Item from '../Items/Item'
const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([])

  // fetching all popular in women data from api
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_SERVER_URL}/popularinwomen`)
    .then((response)=> response.json())
    .then((data)=> setPopularProducts(data))
  },[])

  return (
    <div className='bg-gray-100 py-10 px-6 md:px-12 lg:py-20  '>
       <div className='max-w-7xl mx-auto'>
         <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold'> POPULAR IN WOMEN</h1>
        <hr className='mb-4 md:mb-12 w-[25%] border-2 flex mx-auto mt-3' />
        <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center'>
           {popularProducts.map((item,i)=>{
              return <Item key={item.id} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price} />
           })}
        </div>
       </div>
    </div>
  )
}

export default Popular
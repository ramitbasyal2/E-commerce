import React from 'react'
import data_product from '../../assets/data.js'
import Item from '../Items/Item.jsx'

const RelatedProducts = () => {
  return (
    <div className='bg-gray-100 py-10 px-10 md:px-20 lg:py-20 '>
      <div className='max-w-7xl mx-auto'>
         <h1 className='text-center text-xl lg:text-2xl font-medium'>Related Products</h1>
        <hr className='border-2 w-[25%] mb-5 flex items-center mx-auto mt-4' />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
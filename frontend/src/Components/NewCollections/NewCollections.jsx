import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collection from '../../assets/new_collections'
import Item from '../Items/Item'

const NewCollections = () => {

  const [new_collection, setNew_Collection] = useState([]);

 //fetchhing data from api
  useEffect(()=>{
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/newcollections`)
        .then((response)=> response.json())
        .then((data)=> setNew_Collection(data))
  },[])

  return (
    <div className='bg-gray-100 py-10 px-10 md:px-20 lg:py-20  '>
      <div className='max-w-7xl mx-auto'>
      <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-bold '>NEW COLLECTIONS</h1>
      <hr className='border-2 w-[25%] mb-5 md:mb-8 flex items-center mx-auto mt-4' />
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center ">
        {new_collection.map((item,i)=>{
            return <Item  key={i} id={item.id} name={item.name} image={item.image}
              new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
      </div>
    </div>
  )
}

export default NewCollections
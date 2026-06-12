import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='bg-white hover:shadow-2xl duration-300 transition-all hover:scale-110 w-[260px] p-4 border border-gray-200'>
     <Link to={`/product/${props.id}`}><div className='w-[230px] h-[250px] mb-2'>
          <img className='w-full h-full object-cover' onClick={window.scrollTo(0,0)} src={props.image} alt="" />
       </div></Link>
     <p className='w-[230px] flex flex-wrap'>{props.name}</p>
     <div className="items-prices flex gap-4 ">
        <div className="item-price-new">
             ₹{props.new_price}
        </div>
        <div className="item-price-old">
              ₹{props.old_price}
        </div>
     </div>
    </div>
  )
}

export default Item
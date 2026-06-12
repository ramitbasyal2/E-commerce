import React from 'react'
// import './BreadCrum.css'
import arrow_icon from '../../assets/breadcrum_arrow.png'
import { IoIosArrowForward } from "react-icons/io";
const BreadCrum = (props) => {
 const {product} = props;
 

  return (
    <div className='flex items-center justify-center gap-2 py-8 mb-3 px-2 text-xs'>
        HOME SHOP<IoIosArrowForward color='gray' size={32} /> {product.category} <IoIosArrowForward color='gray' size={33} />  {product.name}
     </div>
  )
}

export default BreadCrum
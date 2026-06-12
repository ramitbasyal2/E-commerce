import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'



const AdminPanel = () => {
  return (
    <div className=''>
       <Sidebar/>
       <Outlet />
    </div>
  )
}

export default AdminPanel
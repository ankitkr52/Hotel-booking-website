import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const sidebarLinks=[
    {name:"Dashboard",path:"/owner",icons:assets.dashboardIcon},
    {name:"Add Room",path:"/owner/add-room",icons:assets.addIcon},
    {name:"List Room",path:"/owner/list-room",icons:assets.listIcon},
  ]

  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-500 pt-4 flex flex-col transition-all duration-300'>
      {sidebarLinks.map((items,idex)=>(
        <NavLink to={items.path} key={index} end="/owner" className={}>

        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar

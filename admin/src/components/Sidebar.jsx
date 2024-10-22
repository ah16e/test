import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from "react-router-dom"
import { assets } from '../assets/assets'

export default function Sidebar() {

    const { token } = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            token && <ul className='text-[#515151] mt-5'>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-apontments'}>
                    <img src={assets.appointment_icon} alt="" />
                    <p>Appointments</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-teacher'}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Teacher</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/teacher-list'}>
                    <img src={assets.people_icon} alt="" />
                    <p>Teacher List</p>
                </NavLink>
            </ul>
        }
        
    </div>
  )
}

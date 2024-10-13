
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import admin_logo_2 from "/src/assets/admin_logo_2.png"
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {

    const {aToken,setAToken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = ()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-sm'>
            <img className='w-14 sm:w-16 cursor-pointer' src={admin_logo_2} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-700'>{aToken ? 'Admin' : 'Teacher'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

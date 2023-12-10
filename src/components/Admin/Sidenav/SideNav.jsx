import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi'
import { BiHomeSmile } from 'react-icons/bi'
import { TbBrandBooking } from 'react-icons/tb'
import { MdOutlineVerified } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'
import adminAxios from '../../../Axios/adminAxios.js';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'



const SideNav = () => {


  const navigate = useNavigate();


  const adminlogoutHandler = async () => {
    try {
      await adminAxios.post('/adminlogout')
      localStorage.removeItem('admintoken')
      toast.success('Logged out successfully')
      navigate('/admin')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="bg-rose-500 h-screen ">
      <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3] '>
        <h1 className='text-white text-[18px] leading-[24px] font-extrabold cursor-pointer'>Admin Panel</h1>
      </div>
      <div className='px-[25px]'>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <FaTachometerAlt color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/dashboard") }}>Dashboard</p>
        </div>

        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <FiUsers color='white' />

          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/userlist") }}>Users</p>
        </div>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <BiHomeSmile color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/category") }} >Category</p>
        </div>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <BiHomeSmile color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/homes") }}>Homes</p>
        </div>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <TbBrandBooking color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/bookings") }}>Bookings</p>
        </div>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <MdOutlineVerified color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={() => { navigate("/homeverification") }}>Verification</p>
        </div>
        <div className='flex items-center gap-[15px] py-[20px]  border-b-[1px] border-[#EDEDED]/[0.3]'>
          <AiOutlineLogout color='white' />
          <p className='text-white text-[14px] font-bold leading-[20px] cursor-pointer' onClick={adminlogoutHandler}>Logout</p>
        </div>
      </div>

    </div >
  )
}

export default SideNav

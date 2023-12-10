import React from 'react'
import Bookings from '../../components/Admin/Bookings'
import SideNav from '../../components/Admin/Sidenav/SideNav'

const BookingList = () => {
    return (
        <div className='flex'>
            <div className='basis-[13%] h-[100vh]'>
                <SideNav />
            </div>
            <div className='basis-[87%] border'>
                <Bookings />
            </div>
        </div>
    )
}

export default BookingList
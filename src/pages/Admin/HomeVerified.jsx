import React from 'react'
import SideNav from '../../components/Admin/Sidenav/SideNav'
import Homes from '../../components/Admin/Homes'

const HomeVerified = () => {
    return (
        <div className='flex'>
            <div className='basis-[13%] h-[100vh]'>
                <SideNav />
            </div>
            <div className='basis-[87%] border'>
                <Homes />
            </div>
        </div>
    )
}

export default HomeVerified
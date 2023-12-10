import React from 'react'
import HomeVerification from '../../components/Admin/HomeVerification'
import SideNav from '../../components/Admin/Sidenav/SideNav'

const HomeVerify = () => {
    return (
        <div className='flex'>
            <div className='basis-[13%] h-[100vh]'>
                <SideNav />
            </div>
            <div className='basis-[87%] border'>
                <HomeVerification />
            </div>
        </div>
    )
}

export default HomeVerify
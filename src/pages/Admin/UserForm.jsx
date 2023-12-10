import React from 'react'
import UserList from '../../components/Admin/UserList'
import SideNav from '../../components/Admin/Sidenav/SideNav'

const UserForm = () => {
    return (
        <div className='flex'>
            <div className='basis-[13%] h-[100vh]'>
                <SideNav />
            </div>
            <div className='basis-[87%] border'>
                <UserList />
            </div>
        </div>
    )
}

export default UserForm
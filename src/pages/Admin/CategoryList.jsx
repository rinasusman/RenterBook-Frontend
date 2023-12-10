import React from 'react'
import Catogeriy from '../../components/Admin/Catogeriy'
import SideNav from '../../components/Admin/Sidenav/SideNav'
import CategoryModal from '../../components/Admin/CategoryModal'

const CategoryList = () => {
    return (
        <div className='flex'>
            <div className='basis-[13%] h-[100vh]'>
                <SideNav />
            </div>
            <div className='basis-[87%] border'>
                <Catogeriy />
                <CategoryModal />
            </div>
        </div>
    )
}

export default CategoryList
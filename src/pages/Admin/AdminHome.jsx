import React from 'react'
import SideNav from '../../components/Admin/Sidenav/SideNav'
import Dashboard from '../../components/Admin/Dashboard'

import ReportModal from '../../components/Admin/ReportModal'


const AdminHome = () => {
  return (
    <div className='flex'>
      <div className='basis-[13%] h-[100vh]'>
        <SideNav />
      </div>
      <div className='basis-[87%] border'>
        <Dashboard />
        <ReportModal />
      </div>
    </div>

  )
}

export default AdminHome
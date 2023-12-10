import React from 'react'
import Navbar from '../../components/Client/Navbar/Navbar'
import UserMenu from '../../components/Client/Navbar/UserMenu'
import Myproperty from '../../components/Client/Property/Myproperty'
import RentModal from '../../components/Client/Modal/RentModal'


const Property = () => {
    return (
        <>
            <Navbar />
            <UserMenu />
            <RentModal />
            <div className="pb-20 pt-20">
                <Myproperty />
            </div >
        </>
    )
}

export default Property
import React from 'react'


import LoginModal from '../../components/Client/Modal/LoginModal'
import RegisterModal from '../../components/Client/Modal/RegisterModal'
import OtpModal from '../../components/Client/Modal/OtpModal'
import EmailModal from '../../components/Client/Modal/EmailModal'
import ForgotpassOtpModal from '../../components/Client/Modal/ForgotpassOtpModal'
import RentModal from '../../components/Client/Modal/RentModal'
import Listsingle from '../../components/Client/listingHome/Listsingle'
import Navbar from '../../components/Client/Navbar/Navbar'
import UserMenu from '../../components/Client/Navbar/UserMenu'
import ResetpassModal from '../../components/Client/Modal/ResetpassModal'

const SIngleHome = () => {
    return (
        <>
            <Navbar />
            <UserMenu />
            <LoginModal />
            <RegisterModal />
            <OtpModal />
            <EmailModal />
            <ForgotpassOtpModal />
            <ResetpassModal />
            <RentModal />
            <div className="pb-20 pt-20">
                <Listsingle />

            </div >
        </>
    )
}

export default SIngleHome
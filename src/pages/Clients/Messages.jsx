import React from 'react'
import Navbar from '../../components/Client/Navbar/Navbar'
import UserMenu from '../../components/Client/Navbar/UserMenu'
import LoginModal from '../../components/Client/Modal/LoginModal'
import RegisterModal from '../../components/Client/Modal/RegisterModal'
import OtpModal from '../../components/Client/Modal/OtpModal'
import EmailModal from '../../components/Client/Modal/EmailModal'
import ForgotpassOtpModal from '../../components/Client/Modal/ForgotpassOtpModal'
import ResetpassModal from '../../components/Client/Modal/ResetpassModal'
import RentModal from '../../components/Client/Modal/RentModal'
import Chat from '../../components/Client/Chat/Chat'

const Messages = () => {
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
                <Chat />

            </div >
        </>
    )
}

export default Messages
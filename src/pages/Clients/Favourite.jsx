import React from 'react'
import FavoritesList from '../../components/Client/Favorites/FavoritesList'
import RentModal from '../../components/Client/Modal/RentModal'
import ResetpassModal from '../../components/Client/Modal/ResetpassModal'
import ForgotpassOtpModal from '../../components/Client/Modal/ForgotpassOtpModal'
import EmailModal from '../../components/Client/Modal/EmailModal'
import OtpModal from '../../components/Client/Modal/OtpModal'
import RegisterModal from '../../components/Client/Modal/RegisterModal'
import LoginModal from '../../components/Client/Modal/LoginModal'
import UserMenu from '../../components/Client/Navbar/UserMenu'
import Navbar from '../../components/Client/Navbar/Navbar'

const Favourite = () => {
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
                <FavoritesList />

            </div >
        </>
    )
}

export default Favourite
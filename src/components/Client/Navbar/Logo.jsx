import React from 'react'
import { useNavigate } from 'react-router-dom';



const Logo = () => {

    const navigate = useNavigate();
    const HandleLogo = () => {
        navigate("/")
    }
    return (

        <img

            alt="Logo" className='hidden md:block cursor-pointer' height="100" width="100" src="/images/logo.png" onClick={HandleLogo} />
    );
};

export default Logo;
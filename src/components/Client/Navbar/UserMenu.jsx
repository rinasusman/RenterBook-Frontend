import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import MenuItem from "./MenuItem";
import Avatar from "../../Avatar";
import useRegisterModal from "../../../Hooks/useRegisterModal";
import useLoginModal from "../../../Hooks/useLoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../Redux/container/userApiSlice";
import { setUserLogout } from '../../../Redux/container/userAuth.slice'
import { useNavigate } from "react-router-dom";
import useRentModal from "../../../Hooks/useRentModal";

const UserMenu = () => {


  const { userToken } = useSelector((state) => state.auth)
  console.log(userToken, "token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  const name = userToken?.userSignUp?.name || ""
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";
  console.log(firstLetter, "fisrtletter:")
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);



  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleSignUpClick = () => {

    registerModal.onOpen();
  };
  const handleLoginClick = () => {

    loginModal.onOpen();
  };
  const handlePropertyClick = () => {

    navigate("/myproperties")
  };

  const handleMessage = () => {

    navigate("/messages")
  };
  const handleFavoritesClick = () => {

    navigate("/favorites")
  };
  const handleTripClick = () => {

    navigate("/mytrips")
  };
  const handleReservationClick = () => {

    navigate("/myreservation")
  };
  const handlePanelClick = () => {

    navigate("/panelmanage")
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(setUserLogout());

      navigate('/')

    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div

          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Welcome <span className="text-rose-500">{name}</span>
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {userToken && userToken.userSignUp && userToken.userSignUp.message === 'You are logged' ? (
              <div className="flex items-center justify-center bg-rose-500 rounded-full w-[30px] h-[30px]">
                <span className="font-semibold text-2xl text-white">{firstLetter}</span>

              </div>
            ) : (
              <Avatar src="/images/placeholder.jpg" />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">

            {userToken && userToken.userSignUp && userToken.userSignUp.message === 'You are logged' ? (
              <>
                <MenuItem label="My trips" onClick={handleTripClick} />
                <MenuItem label="Messages" onClick={handleMessage} />
                <MenuItem label="My favorites" onClick={handleFavoritesClick} />
                <MenuItem label="My reservations" onClick={handleReservationClick} />
                <MenuItem label="My properties" onClick={handlePropertyClick} />
                <MenuItem label="Panel Manage" onClick={handlePanelClick} />
                <MenuItem label="homebnb my home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={logoutHandler} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={handleLoginClick} />

                <MenuItem label="Sign up" onClick={handleSignUpClick} />
              </>
            )



            }






          </div>
        </div>


      )}
    </div>
  );
};

export default UserMenu;

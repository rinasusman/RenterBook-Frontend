import React, { useState } from "react";
import Navbar from "../../components/Client/Navbar/Navbar";
import UserMenu from "../../components/Client/Navbar/UserMenu";
import LoginModal from "../../components/Client/Modal/LoginModal";
import RegisterModal from "../../components/Client/Modal/RegisterModal";
import OtpModal from "../../components/Client/Modal/OtpModal";
import Categories from "../../components/Client/Navbar/Categories";
import ListingHome from "../../components/Client/listingHome/ListingHome";
import EmailModal from "../../components/Client/Modal/EmailModal";
import ForgotpassOtpModal from "../../components/Client/Modal/ForgotpassOtpModal";
import RentModal from "../../components/Client/Modal/RentModal";
import ResetpassModal from "../../components/Client/Modal/ResetpassModal";
import SearchModal from "../../components/Client/Modal/SearchModal";


const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  console.log(selectedCategory, "catttttttt")
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar />
      <UserMenu />
      <SearchModal />
      <Categories onCategorySelect={handleCategorySelect} />
      <LoginModal />
      <RegisterModal />
      <OtpModal />
      <EmailModal />
      <ForgotpassOtpModal />
      <ResetpassModal />
      <RentModal />
      <div className="pb-20 pt-18">
        <ListingHome selectedCategory={selectedCategory} />

      </div >
    </>
  );
};

export default Home;

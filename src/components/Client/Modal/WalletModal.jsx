import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import Modal from "./Modal.jsx";

import usewalletModal from "../../../Hooks/usewalletModal.js";
import userAxios from "../../../Axios/guestAxios.js";

const WalletModal = () => {

  const [walletHistory, setWalletHistory] = useState([]);
  const loginModal = usewalletModal();



  const {

    handleSubmit,


  } = useForm({
    defaultValues: {
      name: '',
      description: ''

    },
  });
  useEffect(() => {
    const fetchWalletHistory = async () => {
      const tokens = localStorage.getItem('usertoken');
      console.log("Tokens:", tokens);
      const headers = {
          'Authorization': `Bearer ${tokens}`,
          'Content-Type': 'application/json',
      };
      try {
        const response = await userAxios.get('/walletHistory',{headers});
        setWalletHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWalletHistory();
  }, []);

 const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    return formattedDate;
  };
  const bodyContent = (
    <div className="flex flex-col gap-4 justify-center items-center">
  
  {walletHistory.map((entry) => (
        <div key={entry._id} className="flex flex-row justify-between gap-7">
          <p>Date:{formatDate(entry.date)}</p>
          <p className="text-lime-500">Amount: {entry.amount}</p> Credited
        </div>
      ))}



    </div >
  );



  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Wallet"
        actionLabel="Continue"
        hideSubmitButton={true}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit()}
        body={bodyContent}

      />
    </>
  );
};

export default WalletModal;

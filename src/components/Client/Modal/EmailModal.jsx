import React from "react";



import { useForm } from "react-hook-form";

import userAxios from "../../../Axios/guestAxios.js";
import Heading from "../../Heading.jsx";

import Modal from "./Modal.jsx";
import Input from "../inputs/Input.jsx";
import axios from "axios";

import { toast } from "react-toastify";
import useEmailModal from "../../../Hooks/useEmailModal.js";
import useForgotpassOtpModal from "../../../Hooks/useForgotpassOtpModal.js";

const EmailModal = () => {
  const otpModal = useForgotpassOtpModal();
  const emailModal = useEmailModal();



  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''

    },
  });

  React.useEffect(() => {
    reset({
      email: "",
      password: "",
    });
  }, [reset]);


  const onSubmit = async (data) => {






    try {
      const otpSend = await userAxios.post('/forgotsendotp', data);
      if (otpSend) {
        emailModal.onClose();
        otpModal.onOpen();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {

        toast.error(e.response?.data?.error || '');
      } else {

        toast.error('An error occurred');
      }
    }
  };





  const bodyContent = (
    <div className="flex flex-col gap-4">

      <Heading title="Welcome back" subtitle="Reset your account!" />
      <Input
        id="email"
        label="Email"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />


    </div >
  );


  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={emailModal.isOpen}
        title="Enter Email"
        actionLabel="Continue"
        onClose={emailModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}

      />
    </>
  );
};

export default EmailModal;

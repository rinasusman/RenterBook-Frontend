import React, { useState } from "react";



import { useForm } from "react-hook-form";

import userAxios from "../../../Axios/guestAxios.js";
import Heading from "../../Heading.jsx";
import Modal from "./Modal.jsx";
import Input from "../inputs/Input.jsx";
import axios from "axios";

import { toast } from "react-toastify";
import useResetpassModal from "../../../Hooks/useResetpassModal.js";
import useLoginModal from "../../../Hooks/useLoginModal.js";

const ResetpassModal = () => {
  const loginModal = useLoginModal();
  const resetModal = useResetpassModal();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {

      password: '',
      confirmpassword: '',
    },
  });

  React.useEffect(() => {
    reset({

      password: "",
    });
  }, [reset]);


  const onSubmit = async (data) => {
    setIsLoading(true);
    if (data.password !== data.confirmpassword) {
      setPasswordMatchError(true);
      setIsLoading(false);
      return;
    }
    setPasswordMatchError(false);


    try {
      const otpSend = await userAxios.post('/passwordReset', data);
      if (otpSend) {
        resetModal.onClose();
        loginModal.onOpen();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {

        toast.error(e.response?.data?.error || '');
      } else {

        toast.error('An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };





  const bodyContent = (
    <div className="flex flex-col gap-4">

      <Heading title="Welcome back" subtitle="Reset your account!" />
      <div className="relative">
        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required

        />

      </div>
      {errors.password && (
        <p className="text-rose-500">{errors.password.message}</p>
      )}
      <Input
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {passwordMatchError && (
        <p className="text-rose-500">Password and Confirm Password do not match.</p>
      )}



    </div >
  );


  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={resetModal.isOpen}
        title="Enter Email"
        actionLabel="Continue"
        onClose={resetModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}

      />
    </>
  );
};

export default ResetpassModal;

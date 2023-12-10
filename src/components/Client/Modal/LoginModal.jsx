import React, { useCallback } from "react";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

import Heading from "../../Heading";
import Button from "../../Button";
import Modal from "./Modal";
import Input from "../inputs/Input";
import useRegisterModal from "../../../Hooks/useRegisterModal";
import useLoginModal from "../../../Hooks/useLoginModal";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../Redux/container/userApiSlice.js";
import { setUserLogin } from "../../../Redux/container/userAuth.slice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useEmailModal from "../../../Hooks/useEmailModal.js";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const emailModal = useEmailModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();



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

      const res = await login({ data }).unwrap();

      console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>iiiiiii")

      if (res.userSignUp.message === 'You are logged') {
        dispatch(setUserLogin({ ...res }));

        const tokens = res.userSignUp.token
        localStorage.setItem('usertoken', tokens)

        loginModal.onClose();

        toast.success(res.userSignUp.message)
        navigate("/");
      }
      else if (res.message === 'User not registered') {
        toast.error("User not registered. Please sign up.");
      }
      else {
        reset();
        toast.error(res.userSignUp.message)

      }


    } catch (err) {

      toast.error(err?.data?.message || err.error);
    }


  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
    reset({
      email: "",
      password: "",
    });
  }, [loginModal, registerModal, reset]);


  const onToggles = useCallback(() => {
    loginModal.onClose();
    emailModal.onOpen();
    reset({
      email: "",
      password: "",
    });
  }, [loginModal, emailModal, reset])


  const bodyContent = (
    <div className="flex flex-col gap-4">

      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        // disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="text-neutral-500 text-end  font-light">
        <p>
          <span
            onClick={onToggles}
            className="text-black cursor-pointer hover:underline"
          >
            {" "}
            Forgot password?
          </span>
        </p>
      </div>

    </div >
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} />


      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Renter?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Modal
        // disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;

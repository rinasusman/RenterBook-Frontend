import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import zxcvbn from 'zxcvbn';
import userAxios from '../../../Axios/guestAxios.js';
import Heading from '../../Heading';
import Modal from './Modal';
import Input from '../inputs/Input';
import useRegisterModal from '../../../Hooks/useRegisterModal';
import useOtpModal from '../../../Hooks/useOtpModal';
import useLoginModal from '../../../Hooks/useLoginModal';
import axios from 'axios';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const otpModal = useOtpModal();

    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordStrengthColor, setPasswordStrengthColor] = useState('transparent');

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
    });

    // Function to calculate password strength color
    const calculatePasswordStrengthColor = (password) => {
        const result = zxcvbn(password);
        const score = result.score;
        const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        console.log('Password score:', score);
        const strengthColor = colors[score];
        console.log('Strength color:', strengthColor);
        return strengthColor;
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        if (data.password !== data.confirmpassword) {
            setPasswordMatchError(true);
            setIsLoading(false);
            return;
        }
        setPasswordMatchError(false);

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            const otpSend = await userAxios.post('/sendotp', payload);
            if (otpSend) {
                registerModal.onClose();
                otpModal.onOpen();
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


    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-2">
            <Heading title="Welcome to Renter" subtitle="Create an account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="relative">
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    onChange={(e) => {
                        const password = e.target.value;
                        const strengthColor = calculatePasswordStrengthColor(password);
                        setPasswordStrengthColor(strengthColor);
                    }}

                />
                <div
                    className="absolute h-1 rounded"
                    style={{
                        width: '100%',
                        backgroundColor: passwordStrengthColor,
                    }}
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
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-2 mt-2">
            <hr />
            {/* <Button outline label="Continue with Google" icon={FcGoogle} /> */}
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>
                    Already have an account?
                    <span
                        onClick={onToggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title="Register"
                actionLabel="Continue"
                onClose={registerModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
                footer={footerContent}
            />
            <Toaster />
        </>
    );
};

export default RegisterModal;

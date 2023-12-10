import React, { useEffect, useState } from 'react';



import { useForm } from "react-hook-form";

import userAxios from '../../../Axios/guestAxios.js'


import Heading from '../../Heading';

import Modal from './Modal';
import Input from '../inputs/Input';


import useOtpModal from '../../../Hooks/useOtpModal';
import useLoginModal from '../../../Hooks/useLoginModal';

const OtpModal = () => {


    const otpModal = useOtpModal();
    const loginModal = useLoginModal();
    const [timer, setTimer] = useState(120);

    const [isLoading, setIsLoading] = useState(false);
    const [showResendLink, setShowResendLink] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            otp: '',

        },
    });


    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            setShowResendLink(true);
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer, otpModal]);

    const handleResend = async (data) => {

        await userAxios.post('/sendotp', data);
        setTimer(120);
        setShowResendLink(false);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data);
        const payload = {
            otp: data.otp
        }
        try {
            const response = await userAxios.post("/verifyotp", payload)
            if (response.data.success) {
                otpModal.onClose();
                loginModal.onOpen();
            }
            else {
                window.alert("Failed")
            }
        } catch (e) {
            const error = e;
            if (error.response) {
                window.alert("Failed")
            } else if (error.request) {
                window.alert("Failed")
            } else {
                window.alert("Failed")
            }

        }
        finally {
            setIsLoading(false)
        }

    }



    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Renter"
                subtitle="Your OTP!"
            />
            <Input
                id="otp"
                label="OTP"
                type='number'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

        </div>
    );



    return (
        <Modal
            disabled={isLoading}
            isOpen={otpModal.isOpen}
            title="Verify OTP"
            actionLabel="Continue"
            onClose={otpModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
                <div>
                    <p>Time remaining: <span className='text-rose-500'>{timer}</span> seconds</p>
                    {bodyContent}
                    {showResendLink && (
                        <p>
                            <button className="text-rose-500 cursor-pointer flex  items-end justify-end" onClick={handleResend}>Resend OTP</button>
                        </p>
                    )}
                </div>
            }
        />

    );
}

export default OtpModal;

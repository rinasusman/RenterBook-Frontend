import React, { useState } from 'react';



import { useForm } from "react-hook-form";

import userAxios from '../../../Axios/guestAxios.js'


import Heading from '../../Heading.jsx';

import Modal from './Modal.jsx';
import Input from '../inputs/Input.jsx';

import useFeedbackModal from '../../../Hooks/useFeedbackModal.js';
import { FaRegStar, FaStar } from 'react-icons/fa';

const FeedbackModal = () => {


    const feedbackModal = useFeedbackModal();
    const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);


    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        defaultValues: {
            feedback: '',

        },
    });

    const handleStarClick = (index) => {
        const updatedStars = selectedStars.map((star, i) => (i <= index ? true : false));
        setSelectedStars(updatedStars);
    };




    const onSubmit = async (data) => {
        setIsLoading(true);
        const selectedStarCount = selectedStars.filter((star) => star).length;
        const payload = {
            homeId: feedbackModal.booking?.home?.id,
            star: selectedStarCount,
            feedback: data.feedback,

        }
        console.log(payload, "payload::::::")
        const tokens = localStorage.getItem('usertoken')

        const headers = {
            'Authorization': `Bearer ${tokens}`,
            'Content-Type': 'application/json',
        };
        try {
            const response = await userAxios.post('/feedback', payload, { headers });
            console.log('Feedback saved:', response.data);

        } catch (error) {
            console.error('Error saving feedback:', error);

        } finally {
            setIsLoading(false);
            feedbackModal.onClose();
        }

    }



    const bodyContent = (

        <div className="flex flex-col gap-4">

            <Heading
                title="Please add your star and comments"
                subtitle=""
            />
            <div className="flex flex-row gap-3">
                {selectedStars.map((selected, index) =>
                    selected ? (
                        <FaStar key={index} size={25} onClick={() => handleStarClick(index)} />
                    ) : (
                        <FaRegStar key={index} size={25} onClick={() => handleStarClick(index)} />
                    )
                )}
            </div>
            <Input
                id="feedback"
                label="Add your Feedback"
                type="text"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                maxLength={200}
                height={100}
            />





        </div>
    );



    return (
        <Modal
            disabled={isLoading}
            isOpen={feedbackModal.isOpen}
            title="Give Feedback"
            actionLabel="Continue"
            onClose={feedbackModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />

    );
}

export default FeedbackModal;

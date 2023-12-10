import React from 'react'
import { SlCalender } from "react-icons/sl";
import { MdOutlineFeedback } from 'react-icons/md';
import useFeedbackModal from '../../../Hooks/useFeedbackModal';
import Button from '../../Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const TripCard = ({ booking, activeTab, onCancelClick }) => {


    console.log(booking, "booking id:")
    const feedbackModal = useFeedbackModal();
    const handleFeedbackClick = () => {
        feedbackModal.onOpen(booking);
    };

    const renderButtons = () => {
        switch (activeTab) {
            case 'Upcoming':
                return (
                    <div className='w-1/2'>
                        <Button key={booking?._id} label="Cancel" onClick={onCancelClick} />
                    </div>
                );
            case 'Checkout':
                return (
                    <div className='flex flex-row gap-3'>
                        <div>
                            <SlCalender size={24} />
                        </div>
                        <Link to={`/lsitinfo/${booking.home.id}`} key={booking.home.id}>
                            <div>Book Again</div>
                        </Link>
                        <div>
                            <MdOutlineFeedback size={28} />
                        </div>
                        <div onClick={handleFeedbackClick} className="cursor-pointer" >
                            Feedback
                        </div>
                    </div >
                );
            // Add other cases as needed
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row gap-5'>
                <div className='w-[150px] h-[150px] ' >
                    <img className='rounded-2xl' src={booking?.home?.imageSrc || 'default-image-url'} alt="" />
                </div>
                <div className='flex flex-col'>
                    <div>
                        {booking?.home?.location || 'N/A'}
                    </div>
                    <div>
                        {booking?.startDate} - {booking?.endDate}
                    </div>
                    <div className='text-neutral-500'>
                        {booking?.home?.title || 'N/A'}
                    </div>
                </div>

            </div>
            <div className='flex flex-row items-center gap-5'>

                {renderButtons()}
            </div>
        </div>
    );
};
TripCard.propTypes = {
    booking: PropTypes.shape({
        _id: PropTypes.string,
        home: PropTypes.shape({
            id: PropTypes.string,
            imageSrc: PropTypes.string,
            location: PropTypes.string,
            title: PropTypes.string,
        }),
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }),
    activeTab: PropTypes.string,
    onCancelClick: PropTypes.func.isRequired,
};
export default TripCard
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import PropTypes from 'prop-types';
const Review = ({ userName, star, comment, feedbackDate }) => {


    const calculateDaysAgo = (date) => {
        const today = new Date();
        const feedbackDate = new Date(date);
        console.log(feedbackDate, "date::::")
        const timeDifference = today - feedbackDate;
        console.log(timeDifference, "timeDifference:")
        const daysAgo = timeDifference / (1000 * 60 * 60 * 24);
        return Math.floor(daysAgo)
    };

    return (
        <div className='
        p-4
        '>

            <div className='flex gap-3 items-center'>
                <div className='w-[40px] h-[40px]' >
                    <img className='rounded-full' src="/images/placeholder.jpg" alt="" />
                </div>
                <div className='text-black font-medium' >
                    {userName}
                </div>
            </div>
            <div className='flex mt-2 items-center gap-2'>
                <div className='flex gap-1'>
                    {Array.from({ length: parseInt(star) }, (_, index) => (
                        <AiFillStar key={index} />
                    ))}

                </div>
                <div>{calculateDaysAgo(feedbackDate)} days ago</div>
            </div>
            <div className=' mt-2 items-center text-neutral-500'>
                {comment}
            </div>

        </div>
    )
}
Review.propTypes = {
    userName: PropTypes.string.isRequired,
    star: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    feedbackDate: PropTypes.string.isRequired,
};
export default Review
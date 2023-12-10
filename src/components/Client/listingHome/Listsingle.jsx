import React, { useEffect, useState } from 'react'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import { useParams } from 'react-router-dom';
import userAxios from "../../../Axios/guestAxios.js";
import ListingReservation from './ListingReservation';
import Review from '../Review/Review.jsx';
import ImagesHome from './ImagesHome.jsx';

const Listsingle = () => {

    const { id } = useParams();
    const [listingData, setListingData] = useState(null);
    const [bookingData, setBookingData] = useState([])
    const [feedbackData, setFeedbackData] = useState([]);
    console.log(listingData, "dtaaaaaaa9999999999")
    console.log(bookingData, "dtaaaaaaa000000000000000")
    console.log(feedbackData, "feedback:::::")
    useEffect(() => {
        const fetchListingData = async () => {
            try {
                const response = await userAxios.get(`/getListingById/${id}`);
                console.log(response.data, "responsesingle:::::")
                setListingData(response.data.listing);
                setBookingData(response.data.bookingDetails)
                const feedbackResponse = await userAxios.get(`/getFeedbackByHome/${id}`);
                setFeedbackData(feedbackResponse.data);
            } catch (error) {
                console.error('Error fetching listing data:', error);
            }
        };

        fetchListingData();
    }, [id]);

    const calculateAverageRating = () => {
        if (feedbackData.length === 0) return 0;

        const totalStars = feedbackData.reduce((acc, feedback) => acc + parseInt(feedback.star), 0);
        return (totalStars / feedbackData.length).toFixed(2);
    };

    return (
        <div
            className="
          max-w-screen-lg 
          mx-auto
        "
        >
            <div className="flex flex-col gap-6">
                <ListingHead
                    data={listingData}
                />
                <div
                    className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
                >
                    <ListingInfo
                        data={listingData}
                    />
                    <div
                        className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
                shadow-xl
              "
                    >
                        <ListingReservation
                            data={listingData}
                            bookingData={bookingData}
                        />
                    </div>

                </div>
            </div>
            <hr />
            <ImagesHome data={listingData} />

            <hr />
            <div className='
            flex 
            justify-center
            w-full 
            items-center
             '>
                <div>
                    <img src="/images/leafleft.jpg" alt="" />
                </div>
                <div className='text-neutral-700 font-bold  text-8xl'>{calculateAverageRating()}</div>
                <div>
                    <img src="/images/leafright.jpg" alt="" />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-semibold'>Guest favourite</div>
                <div className='text-neutral-500'> One of the most loved homes on Renter<br /> based on ratings, reviews and reliability</div>
            </div>

            <div className="
           
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-1
            lg:grid-cols-1
            xl:grid-cols-2
            2xl:grid-cols-2
            p-2
            justify-between">






                {feedbackData.map((feedback) => (
                    <Review
                        key={feedback._id} // Use a unique key for each Review component
                        userName={feedback.userId?.name} // Assuming you have a userName property in your feedback data
                        star={feedback.star}
                        feedbackDate={feedback.createDate}
                        comment={feedback.feedback}
                    />
                ))}


            </div>
        </div >
    )
}

export default Listsingle
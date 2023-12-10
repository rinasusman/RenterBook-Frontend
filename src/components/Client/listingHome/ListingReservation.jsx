import React, { useState } from 'react'
import Button from '../../Button'
import DateCalendar from '../inputs/DateCalnder'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const ListingReservation = ({ data, bookingData }) => {
    console.log(data, "reser:")
    console.log(bookingData, "reservation date:")
    const [selectedRange, setSelectedRange] = useState(null);
    if (!data) {

        return <div>No data available</div>;
    }

    const handleReservation = () => {
        if (selectedRange) {

            const nights = calculateNights();



            const reservationData = {
                startDate: selectedRange.startDate,
                endDate: selectedRange.endDate,
                guestCount: data.guestCount,
                homeTitle: data.title,
                price: data.price,
                imageSrc: data.imageSrc,
                totalNights: nights,
                id: data._id
            };
            console.log(reservationData, "reservationData:");
            return (
                <Link to="/checkout" state={{ reservationData }}>
                    <Button label="Reserve" />
                </Link >
            );
        }
    }
    const calculateNights = () => {
        if (selectedRange) {
            const start = selectedRange.startDate;
            const end = selectedRange.endDate;
            const timeDiff = end.getTime() - start.getTime();
            const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return nightCount;
        }
        return 0;
    };
    const total = selectedRange ? data.price * calculateNights() : data.price;

    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(data.price);

    // Format the total
    const formattedTotal = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(total);


    return (
        <div
            className="
        bg-white 
          rounded-xl 
          border-[1px]
        border-neutral-200 
          overflow-hidden
        "
        >
            <div className="
        flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    {formattedPrice}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <div className="flex justify-center"> {/* Center the DateCalendar component */}
                <DateCalendar
                    setSelectedRange={setSelectedRange}
                    bookingData={bookingData}
                />
            </div>
            <hr />
            <div className="p-4">
                {handleReservation()}
            </div>
            <hr />
            <div
                className="
            p-4 
            flex 
            flex-row 
            items-center 
            justify-between
            font-semibold
            text-lg
          "
            >
                <div>
                    Total
                </div>
                <div>
                    {formattedTotal}
                </div>
            </div>

        </div>
    )
};

ListingReservation.propTypes = {
    data: PropTypes.shape({
        guestCount: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        imageSrc: PropTypes.string,
        _id: PropTypes.string,
    }),
    bookingData: PropTypes.array.isRequired,
};

export default ListingReservation
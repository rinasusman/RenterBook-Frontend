import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PropTypes from 'prop-types';

const DateCalendar = ({ setSelectedRange, bookingData }) => {
    const today = new Date();
    const [selectionRange, setSelectionRange] = useState({
        startDate: today,
        endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        key: 'selection',
    });
    console.log(selectionRange, "rangeeeeeeeeeeeeeeeee")




    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        setSelectedRange(ranges.selection);
    };
    const getBlockedDates = () => {
        return bookingData.flatMap((bookingRange) => {
            const startDate = new Date(bookingRange.startDate);
            const endDate = new Date(bookingRange.endDate);
            const dateArray = [];
            let currentDate = startDate;
            while (currentDate <= endDate) {
                dateArray.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dateArray;
        });
    };

    const disabledDates = getBlockedDates();
    console.log(disabledDates, "disable::::")
    return (
        <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={today}
            disabledDates={disabledDates}
        />
    );
}
DateCalendar.propTypes = {
    setSelectedRange: PropTypes.func.isRequired,
    bookingData: PropTypes.array.isRequired,
};
export default DateCalendar;

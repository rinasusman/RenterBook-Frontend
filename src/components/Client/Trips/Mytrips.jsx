
import React, { useEffect, useState } from 'react'
import Container from '../../Container'
import Heading from '../../Heading'
import PropTypes from 'prop-types';
import TripCard from './TripCard';
import userAxios from '../../../Axios/guestAxios';
import Swal from 'sweetalert2';
const Mytrips = ({
    title = "Booking List Empty",
    subtitle = "Please add your Booking", }) => {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('Upcoming');
    console.log(bookings, "booking:::::::::::")
    const fetchBookings = async () => {
        try {
            const tokens = localStorage.getItem('usertoken');

            const headers = {
                Authorization: `Bearer ${tokens}`,
                'Content-Type': 'application/json',
            };
            const response = await userAxios.get('/getbookhome', { headers });
            const data = response.data;
            console.log(data, 'daa::::::');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);
    const upcomingBookings = bookings.filter((booking) => booking.status === 'Booked');
    const checkoutBookings = bookings.filter((booking) => booking.status === 'Checkout');
    const cancelledBookings = bookings.filter((booking) => booking.status === 'Cancelled');


    const filteredBookings = {
        Upcoming: upcomingBookings,
        Checkout: checkoutBookings,
        Cancelled: cancelledBookings,
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleCancelClick = async (bookingId) => {
        // Show SweetAlert confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
        });

        // If the user clicks "Yes, cancel it!" in the SweetAlert dialog
        if (result.isConfirmed) {
            try {
                const tokenss = localStorage.getItem('usertoken');
                console.log(tokenss, "tokenss:::")
                const headers = {
                    Authorization: `Bearer ${tokenss}`,
                    'Content-Type': 'application/json',
                };
                await userAxios.put(`/cancelbooking/${bookingId}`, {}, { headers });

                // Refresh the bookings after cancellation
                fetchBookings();

                // Show success message
                Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
            } catch (error) {
                console.error('Error cancelling booking:', error);
                // Show error message
                Swal.fire('Error', 'There was an error cancelling your booking.', 'error');
            }
        }
    }
    return (
        <Container>
            <Heading
                title="My Trips"
                subtitle="List of your Trips"
            />
            <div>
                <div className="tabs font-bold  pt-3">
                    <button
                        className={`tab ${activeTab === 'Upcoming' ? 'active' : 'inactive'} mr-4 `}
                        onClick={() => handleTabClick('Upcoming')}
                        disabled={activeTab === 'Upcoming'}
                    >
                        {activeTab === 'Upcoming' ? 'Upcoming' : <span className='text-neutral-500'>Upcoming</span>}
                    </button>
                    <button
                        className={`tab ${activeTab === 'Checkout' ? 'active' : 'inactive'} mr-4`}
                        onClick={() => handleTabClick('Checkout')}
                        disabled={activeTab === 'Checkout'}
                    >
                        {activeTab === 'Checkout' ? 'Checkout' : <span className='text-neutral-500'>Checkout</span>}

                    </button>
                    <button
                        className={`tab ${activeTab === 'Cancelled' ? 'active' : 'inactive'} mr-4`}
                        onClick={() => handleTabClick('Cancelled')}
                        disabled={activeTab === 'Cancelled'}
                    >
                        {activeTab === 'Cancelled' ? 'Cancelled' : <span className='text-neutral-500'>Cancelled</span>}

                    </button>
                </div>

                {/* Content for each tab */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
                    {filteredBookings[activeTab].length > 0 ? (
                        filteredBookings[activeTab].map((booking) => (
                            <TripCard key={booking._id} booking={booking} activeTab={activeTab} onCancelClick={() => handleCancelClick(booking._id)} />
                        ))
                    ) : (
                        <div
                            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
              "
                        >
                            <Heading center title={title} subtitle={subtitle} />
                        </div>
                    )}
                </div>
            </div>
        </Container >
    )
}
Mytrips.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
export default Mytrips



const handleCancelClick = async (bookingId) => {
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
    }
    catch (error) {
        console.error('Error cancelling booking:', error);
    }
};
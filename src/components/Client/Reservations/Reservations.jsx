import React, { useEffect, useState } from 'react'
import Heading from '../../Heading'
import Container from '../../Container'
import ResevationCard from './ResevationCard'
import userAxios from '../../../Axios/guestAxios';


const Reservations = () => {


    const [reservations, setReservations] = useState([]);
    console.log("reservations::", reservations)

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const tokens = localStorage.getItem('usertoken');
                console.log("Tokens:", tokens);
                const headers = {
                    'Authorization': `Bearer ${tokens}`,
                    'Content-Type': 'application/json',
                };
                console.log("Headers:", headers);
                const response = await userAxios.get('/reservationhome', { headers });
                console.log("API Response:", response.data);
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />


            <div
                className="
            mt-10
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-2
            xl:grid-cols-2
            2xl:grid-cols-2
            gap-8
          "
            >

                {reservations.map((reservation) => (
                    <ResevationCard key={reservation._id} reservation={reservation} />
                ))}


            </div>
        </Container>
    )
}

export default Reservations
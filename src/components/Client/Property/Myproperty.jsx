import React, { useEffect, useState } from 'react';
import Heading from '../../Heading';
import ListingCardSingle from '../listingHome/ListingCardSingle';
import Container from '../../../components/Container.jsx';
import userAxios from '../../../Axios/guestAxios';
import PropTypes from 'prop-types';

const Myproperty = ({
    title = "No Home is added",
    subtitle = ".", }) => {
    const [listinghome, setListingHome] = useState([]);
    const [listings, setListings] = useState([]);

    const handleDelete = (itemId) => {
        // Filter out the deleted item from the listings
        const updatedListings = listings.filter(item => item._id !== itemId);
        setListings(updatedListings);
    };

    useEffect(() => {
        const fetchHomeDetails = async () => {
            try {
                const tokens = localStorage.getItem('usertoken');
                const headers = {
                    'Authorization': `Bearer ${tokens}`,
                    'Content-Type': 'application/json',
                };

                if (headers.Authorization) {
                    const response = await userAxios.get('/getHomeListSingle', { headers });
                    setListingHome(response.data);
                }

            } catch (e) {
                console.error('Error fetching home details:', e);
            }
        };

        fetchHomeDetails();
    }, []);

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            {listinghome.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listinghome.map((home, index) => (
                        <ListingCardSingle
                            key={index}
                            data={home}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
              ">
                    <Heading
                        center
                        title={title}
                        subtitle={subtitle}
                    />

                </div>
            )}
        </Container>
    );
};
Myproperty.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
export default Myproperty;

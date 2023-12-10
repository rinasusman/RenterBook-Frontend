import React, { useEffect, useState } from 'react'
import Container from '../../Container'
import Heading from '../../Heading'
import ListingCard from '../listingHome/ListingCard'
import userAxios from '../../../Axios/guestAxios';
import PropTypes from 'prop-types';
const FavoritesList = ({
    title = "Favorite List Empty",
    subtitle = "Please add your favorite", }) => {
    const [listinghome, setListingHome] = useState([]);
    console.log(listinghome, "homeee")
    const [heartStates, setHeartStates] = useState({});

    const handleHeartToggle = (listingId) => {
        setHeartStates((prev) => ({
            ...prev,
            [listingId]: !prev[listingId],
        }));
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
                    const response = await userAxios.get('/getFavoriteHomeList', { headers });
                    if (Array.isArray(response.data)) {
                        setListingHome(response.data);
                    } else {
                        console.error('Invalid response data:', response.data);
                    }



                }

            } catch (e) {
                console.error('Error fetching home details:', e);
            }
        };

        fetchHomeDetails();
    }, []);
    console.log(listinghome.length, ":length")
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of your favorites"
            />
            {listinghome.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listinghome.map((home, index) => (
                        <ListingCard key={index} data={home}
                            isHeartFilled={heartStates[home._id] || false}
                            toggleHeart={() => handleHeartToggle(home._id)} />
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
    )
}
FavoritesList.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

export default FavoritesList
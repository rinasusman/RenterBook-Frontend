import React, { useEffect, useState } from 'react';
import Container from '../../Container';
import EmptyPage from '../../EmptyPage';
import ListingCard from './ListingCard';
import userAxios from "../../../Axios/guestAxios.js";
import { useLocation } from 'react-router-dom';
import { selectSearchResults } from '../../../Redux/container/searchSlice.js';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const ListingHome = ({ selectedCategory }) => {
    const [listings, setListings] = useState([]);
    const [heartStates, setHeartStates] = useState({});
    const [visibleListings, setVisibleListings] = useState(10);
    const [showLessButton, setShowLessButton] = useState(false);
    const location = useLocation();
    const searchResults = useSelector(selectSearchResults);

    console.log(searchResults, "list:::::::::::::::")
    const handleHeartToggle = (listingId) => {
        setHeartStates((prev) => ({
            ...prev,
            [listingId]: !prev[listingId],
        }));
    };
    const fetchHomeDetails = async () => {
        try {
            let response;
            console.log("searchResults:", searchResults);
            if (searchResults && searchResults.length > 0) {
                const decodedSearchResults = searchResults;
                console.log("Decoded Search Results:", decodedSearchResults);

                if (Array.isArray(decodedSearchResults)) {
                    const reversedListing = decodedSearchResults.slice().reverse();
                    console.log("kist Listings:", reversedListing);
                    setListings(reversedListing);
                    return;
                }
            } else {
                // If no search results, fetch all homes
                response = await userAxios.get('/getHomeList', {
                    params: {
                        category: selectedCategory,
                    },
                });
                console.log(response.data, "datttttttaaa::::::")
                if (Array.isArray(response.data)) {
                    const reversedListings = response.data.slice().reverse();
                    console.log("Fetched Listings:", reversedListings);
                    setListings(reversedListings);
                }
            }
        } catch (error) {
            console.error("Error fetching home details:", error);
        }
    };
    useEffect(() => {
        fetchHomeDetails();
    }, [selectedCategory, location.search, searchResults]);

    const resetFilters = () => {

        fetchHomeDetails();
    };








    const filteredListings = selectedCategory
        ? listings.filter((list) => list.category === selectedCategory)
        : listings;

    if (filteredListings.length === 0) {
        return (
            <EmptyPage showReset onReset={resetFilters} />
        );
    }

    const loadMoreListings = () => {
        const newVisibleListings = visibleListings + 10;
        setVisibleListings(newVisibleListings);

        // Check if all listings are visible
        if (newVisibleListings >= filteredListings.length) {
            setShowLessButton(true);
        }
    };

    const loadLessListings = () => {
        setVisibleListings(10);
        setShowLessButton(false);
    };

    const displayedListings = filteredListings.slice(0, visibleListings);

    return (
        <>
            <Container>
                <div className='
                pt-22
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            '>
                    {displayedListings.map((list) => (
                        <React.Fragment key={list._id}>
                            <ListingCard
                                data={list}
                                isHeartFilled={heartStates[list._id] || false}
                                toggleHeart={() => handleHeartToggle(list._id)}
                            />
                        </React.Fragment>
                    ))}
                </div>

            </Container>
            {
                visibleListings < filteredListings.length ? (
                    <div className="flex justify-center mt-4">
                        <button className="bg-black text-white p-2 rounded-2xl mr-4" onClick={loadMoreListings}>Show More</button>
                    </div>
                ) : (
                    showLessButton && (
                        <div className="flex justify-center mt-4">
                            <button className="bg-black text-white p-2 rounded-2xl" onClick={loadLessListings}>Show Less</button>
                        </div>
                    )
                )
            }
        </>
    );
};
ListingHome.propTypes = {
    selectedCategory: PropTypes.string,
};
export default ListingHome;

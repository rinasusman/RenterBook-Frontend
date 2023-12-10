import React, { useEffect, useState } from 'react'
import Heading from '../Heading';
import adminAxios from '../../Axios/adminAxios';
import PropTypes from 'prop-types';

const Bookings = ({
    title = "Booking List is Empty",
    subtitle = ".",

}) => {
    const [ClientDetails, setClientDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const fetchClientDetails = async () => {
        try {
            let response = await adminAxios.get('/getBookingList');
            if (Array.isArray(response.data)) {
                setClientDetails(response.data);
            }
        } catch (e) {
            console.log('error', e.message);
        }
    };

    useEffect(() => {
        fetchClientDetails();
    }, []);

    const getStatusColor = (status) => {
        console.log('Status:', status);
        switch ((status ?? '').toLowerCase()) {
            case 'booked':
                return 'text-orange-500';
            case 'checkin':
                return 'text-green-500';
            case 'checkout':
                return 'text-blue-500';
            case 'cancel':
                return 'text-red-500';
            default:
                return '';
        }
    };



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ClientDetails.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems, "currentItems:::")
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="pt-[25px] px-[25px] bg-[#FBF9FC]">
            <div className="flex items-center justify-between">
                <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    BOOKING LIST
                </h1>
            </div>
            {ClientDetails.length > 0 ? (
                < div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <thead className="border-b bg-rose-500 font-medium text-white dark:border-neutral-500 dark-bg-neutral-900">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                SL
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                NAME
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                TITLE
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                LOCATION
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                DATE
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                IMAGE
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                STATUS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems?.map((user, index) => (
                                            <tr className="border-b dark:border-neutral-500" key={user._id}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    {index + 1}
                                                </td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {user.userId?.name}
                                                </td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {user.item[0]?.home?.title}
                                                </td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {user.item[0]?.home?.location}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2">
                                                    {user.startDate} - {user.endDate}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2">
                                                    <img className="rounded-2xl w-[120px] h-[100px]" src={user.item[0]?.home?.imageSrc} alt="" />
                                                </td>
                                                <td className={`whitespace-nowrap font-semibold px-2 py-2 ${getStatusColor(user.status)}`}>
                                                    {user.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-rose-500 text-white rounded-md px-4 py-2 mr-2"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastItem >= ClientDetails.length}
                            className="bg-rose-500 text-white rounded-md px-4 py-2"
                        >
                            Next
                        </button>
                    </div>
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
            )
            }
        </div >
    )
}
Bookings.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

export default Bookings
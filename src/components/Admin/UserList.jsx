import React, { useEffect, useState } from 'react';
import adminAxios from '../../Axios/adminAxios';
import { toast } from 'react-toastify';
import Heading from '../Heading';
import PropTypes from 'prop-types';
const UserList = ({
    title = "User List is Empty",
    subtitle = ".",

}) => {
    const [ClientDetails, setClientDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchClientDetails = async () => {
        try {
            let response = await adminAxios.get('/getClientList');
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

    const blockUser = async (userId) => {
        try {
            const res = await adminAxios.put(`userblock/${userId}`);
            console.log(res, 'Blocked successfully');
            if (res.data.message === 'user blocked successfully') {
                toast.success('User unblocked successfully');
                const updated = ClientDetails.map((user) =>
                    user._id === userId ? { ...user, status: true } : user
                );
                setClientDetails(updated);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const unblockUser = async (userId) => {
        try {
            const res = await adminAxios.put(`userunblock/${userId}`);
            console.log(res, 'Unblocked successfully');
            if (res.data.message === 'user unblocked successfully') {
                toast.success('User blocked successfully');
                const updated = ClientDetails.map((user) =>
                    user._id === userId ? { ...user, status: false } : user
                );
                setClientDetails(updated);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ClientDetails.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="pt-[25px] px-[25px] bg-[#FBF9FC]">
            <div className="flex items-center justify-between">
                <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    USER LIST
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
                                                EMAIL
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                ACTION
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
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2">
                                                    {user.status ? (
                                                        <button
                                                            className="bg-red-500 rounded-[3px] px-3 h-[20px] text-white cursor-pointer font-medium"
                                                            onClick={() => unblockUser(user._id)}
                                                        >
                                                            BLOCK
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="bg-green-500 rounded-[3px] px-3 h-[20px] text-white cursor-pointer font-medium"
                                                            onClick={() => blockUser(user._id)}
                                                        >
                                                            UNBLOCK
                                                        </button>
                                                    )}
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
            )}
        </div >
    );
};
UserList.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
export default UserList;

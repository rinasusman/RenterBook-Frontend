import React, { useEffect, useState } from 'react';
import useCategoryModal from '../../Hooks/useCategoryModal';
import adminAxios from '../../Axios/adminAxios';
import Heading from '../Heading';
import PropTypes from 'prop-types';
const Catogeriy = ({
    title = "Categories not found",
    subtitle = "Please add Categories.",

}) => {
    const [CategoryDetails, setCategoryDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const categoryModal = useCategoryModal();

    const fetchCategoryDetails = async () => {
        try {
            let response = await adminAxios.get('/getCategoryList');
            if (Array.isArray(response.data)) {
                setCategoryDetails(response.data);
            } else {
                console.error('Response data is not an array:', response.data);
            }
        } catch (e) {
            console.log('error', e.message);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = CategoryDetails.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the starting serial number based on the current page
    const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;

    const paginate = (action) => {
        if (action === 'next') {
            setCurrentPage(currentPage + 1);
        } else if (action === 'previous') {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleList = async (CatId) => {
        const response = await adminAxios.get(`/CategoryList/${CatId}`);
        setCategoryDetails(response.data);
    };

    const handleUnList = async (CatId) => {
        const response = await adminAxios.get(`/CategoryUnList/${CatId}`);
        setCategoryDetails(response.data);
    };

    return (
        <div className="pt-[25px] px-[25px] bg-[#FBF9FC]">
            <div className="flex items-center justify-between">
                <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal">CATEGORY LIST</h1>
                <button
                    onClick={categoryModal.onOpen}
                    className="bg-rose-500 h-[32px] rounded-[3px] text-white flex items-center px-[30px] cursor-pointer">
                    Add category
                </button>
            </div>
            {CategoryDetails.length > 0 ? (
                < div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <thead className="border-b bg-rose-500 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">
                                                SL
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                NAME
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                DESCRIPTION
                                            </th>
                                            <th scope="col" className="px-6 py-4">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((category, index) => (
                                            <tr className="border-b dark:border-neutral-500" key={category._id}>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{startSerialNumber + index}</td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {category.name}
                                                </td>
                                                <td className="whitespace-nowrap text-black font-medium px-6 py-4">
                                                    {category.description}
                                                </td>
                                                <td className="whitespace-nowrap px-2 py-2">
                                                    {category.isDeleted === true ? (
                                                        <button
                                                            className="bg-green-500 rounded-[3px] px-3 h-[20px] text-white cursor-pointer font-medium"
                                                            onClick={() => handleList(category._id)}
                                                        >
                                                            LIST
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="bg-red-500 rounded-[3px] px-3 h-[20px] text-white cursor-pointer font-medium"
                                                            onClick={() => handleUnList(category._id)}
                                                        >
                                                            UNLIST
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
                            onClick={() => paginate('previous')}
                            disabled={currentPage === 1}
                            className="bg-rose-500 text-white rounded-md px-4 py-2 mr-2"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate('next')}
                            disabled={indexOfLastItem >= CategoryDetails.length}
                            className="bg-rose-500 text-white rounded-md px-4 py-2"
                        >
                            Next
                        </button>
                    </div>
                </div>) : (
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
            {/* {CategoryDetails.length === 0 && <h2>Empty list</h2>} */}
        </div >
    );
};
Catogeriy.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
export default Catogeriy;

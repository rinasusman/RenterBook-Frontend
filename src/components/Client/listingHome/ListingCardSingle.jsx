import React from 'react'
import Button from '../../Button'
import userAxios from '../../../Axios/guestAxios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const ListingCardSingle = ({ data, onDelete }) => {

    const { location, category, price, imageSrc } = data;
    const navigate = useNavigate();

    const handleEdit = () => {

        navigate('/homeedit', { state: { itemData: data } })
    }
    const handleDelete = () => {
        Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to delete this item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const tokens = localStorage.getItem('usertoken');
                const headers = {
                    'Authorization': `Bearer ${tokens}`,
                    'Content-Type': 'application/json',
                };
                if (headers.Authorization) {
                    userAxios.delete(`/listdelete/${data._id}`, { headers })
                        .then(() => {

                            onDelete(data._id);
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error("Error deleting item: ", error);
                        });
                }
            }
        });
    };

    return (

        < div

            className="col-span-1 cursor-pointer group mt-4"
        >

            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
                >

                    <img
                        className="object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition" src={imageSrc} alt="" />
                    <div className="
            absolute
            top-3
            right-3
          ">

                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location}
                </div>
                <div className="font-light text-neutral-500">
                    {category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        ₹ {price}
                    </div>

                    <div className="font-light">night</div>

                </div>
                <div className="flex justify-between gap-2">
                    <Button
                        key={data._id}
                        outline
                        label="Edit"
                        onClick={handleEdit}
                    />
                    <Button
                        key={data._id}
                        label="Delete"
                        onClick={handleDelete}
                    />
                </div>



            </div>

        </div >

    )
};
ListingCardSingle.propTypes = {
    data: PropTypes.shape({
        location: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        imageSrc: PropTypes.string,
        _id: PropTypes.string,
    }),
    onDelete: PropTypes.func,
};
export default ListingCardSingle
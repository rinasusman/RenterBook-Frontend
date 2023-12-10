import React from 'react'
import PropTypes from 'prop-types';

const BookDetails = ({ data, total }) => {
    const { homeTitle, imageSrc, totalNights, price } = data

    console.log(data, "dattaaaaaaaaaaaaaaaahomeeeeee:")
    const totalamount = data.price * data.totalNights
    const taxRate = 0.05;
    const taxAmount = totalamount * taxRate;



    return (
        <div
            className="
    bg-white 
      rounded-xl 
      border-[1px]
    border-neutral-200 
      overflow-hidden
    "
        >
            <div className="
              flex flex-row  h-[120px] gap-1 p-4">
                <div className="text-2xl font-semibold w-[150px] h-[200px] ">
                    <img className="rounded-xl " src={imageSrc} alt="" />
                </div>
                <div className="font-light text-neutral-600">
                    {homeTitle}

                </div>
            </div>
            <hr className='ml-4 mr-4' />

            <div className="flex flex-col gap-2 p-4">
                <div
                    className="
                         text-xl 
                          font-semibold 
                           flex 
                         flex-row 
                         items-center
                         gap-2
                     "
                >
                    <div>Price details </div>

                </div>
                <div className='flex flex-row  text-neutral-600 justify-between'>
                    <div>₹{price} x {totalNights} nights</div>
                    <div>₹{totalamount}</div>
                </div>

                <div className='flex flex-row  text-neutral-600 justify-between'>
                    <div>Taxes</div>
                    <div>₹{taxAmount}</div>
                </div>

            </div>

            <hr className='ml-4 mr-4' />
            <div
                className="
        p-4 
        flex 
        flex-row 
        items-center 
        justify-between
        font-semibold
        text-lg
      "
            >
                <div>
                    Total
                </div>
                <div>
                    ₹{total}
                </div>
            </div>
        </div >
    )
}
BookDetails.propTypes = {
    data: PropTypes.shape({
        homeTitle: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        totalNights: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
};
export default BookDetails
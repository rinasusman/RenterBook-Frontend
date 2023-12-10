import React from "react";
import Heading from "../../Heading.jsx";
import HeartButton from "../../HeartButton.jsx";
import PropTypes from "prop-types";

const ListingHead = ({ data, isHeartFilled, toggleHeart }) => {


    if (!data) {
        return null;
    }

    return (
        <div>
            <Heading
                title={data.title}
                subtitle={data.location}
            />
            <div className="
                w-full
                h-[60vh]
                overflow-hidden
                rounded-xl
                relative
            ">
                <img
                    src={data.imageSrc}
                    className="object-cover w-full cursor-pointer"
                    alt="Image"

                />
                <div
                    className="
            absolute
            top-5
            right-5
          "
                >
                    <HeartButton listingId={data._id} isFilled={isHeartFilled} toggleHeart={toggleHeart} />

                </div>

            </div>
            {/* <div className='flex flex-row gap-2'>
                <div className="
                w-[40vw]
                h-[50vh]
                overflow-hidden
                rounded-xl
                relative
            ">
                    <img
                        src={data.imageSrc}
                        className="object-cover w-full cursor-pointer"
                        alt="Image"

                    />
                    <div
                        className="
            absolute
            top-5
            right-5
          "
                    >
                        <HeartButton listingId={data._id} isFilled={isHeartFilled} toggleHeart={toggleHeart} />

                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row gap-2'>
                        <div className="
                w-[20vw]
                h-[25vh]
                overflow-hidden
                rounded-xl
                relative
               
            ">
                            <img
                                src={data.imageSrc}
                                className="object-cover w-full cursor-pointer"
                                alt="Image"

                            />



                        </div>
                        <div className="
                w-[20vw]
                h-[25vh]
                overflow-hidden
                rounded-xl
                relative
               
            ">
                            <img
                                src={data.imageSrc}
                                className="object-cover w-full cursor-pointer"
                                alt="Image"

                            />



                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className="
                w-[20vw]
                h-[25vh]
                overflow-hidden
                rounded-xl
                relative
               
            ">
                            <img
                                src={data.imageSrc}
                                className="object-cover w-full cursor-pointer"
                                alt="Image"

                            />



                        </div>
                        <div className="
                w-[20vw]
                h-[25vh]
                overflow-hidden
                rounded-xl
                relative
               
            ">
                            <img
                                src={data.imageSrc}
                                className="object-cover w-full cursor-pointer"
                                alt="Image"

                            />



                        </div>
                    </div>

                </div>




            </div> */}




        </div >
    );
};

ListingHead.propTypes = {
    data: PropTypes.object,
    isHeartFilled: PropTypes.bool,
    toggleHeart: PropTypes.func,
};

export default ListingHead;

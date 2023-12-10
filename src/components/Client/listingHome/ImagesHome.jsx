import React, { useState } from 'react'
import PropTypes from 'prop-types';
const ImagesHome = ({ data }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    if (!data) {
        return null;
    }

    const openPopup = (url) => {
        setSelectedImage(url);
    };

    const closePopup = () => {
        setSelectedImage(null);
    };
    console.log(data, "immmmmmmm")
    const { imageUrl } = data;
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-1 pb-2'>
                <div className='font-semibold'>Home gallery</div>
                <div className='text-neutral-500'> One of the most loved homes on Renter<br /> based on ratings, reviews and reliability</div>
            </div>
            <div className="
              
                overflow-hidden
                rounded-xl
                relative
                flex 
                grid-cols-3
                gap-1
            ">


                {imageUrl && imageUrl.length > 0 && (
                    imageUrl.map((url, index) => (
                        <img

                            key={index}
                            src={url}
                            className="object-cover w-[33vw] h-[40vh] cursor-pointer"
                            alt={`Image ${index + 1}`}
                            onClick={() => openPopup(url)}
                        />
                    ))
                )}



            </div>
            {selectedImage && (
                <div className="fixed top-9 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="max-w-screen-md">
                        <img
                            src={selectedImage}
                            alt="Selected Image"
                            className="w-full h-full object-contain"
                        />
                        <button
                            onClick={closePopup}
                            className="absolute top-14 right-28 text-white cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>

    )
};
ImagesHome.propTypes = {
    data: PropTypes.shape({
        imageUrl: PropTypes.arrayOf(PropTypes.string),
    }),
};
export default ImagesHome
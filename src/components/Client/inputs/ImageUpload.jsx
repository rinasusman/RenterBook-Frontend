import React, { useRef } from 'react';
import axios from 'axios';
import { TbPhotoPlus } from 'react-icons/tb';
import PropTypes from 'prop-types';

const ImageUpload = ({ onChange, value }) => {
    const fileInputRef = useRef(null);

    const handleFileInputChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            try {
                const cloudName = 'dxwljcjad'; // Replace with your Cloudinary cloud name
                const uploadPreset = 'i9govbk0'; // Replace with your Cloudinary upload preset

                const data = new FormData();
                data.append('file', selectedFile);
                data.append('upload_preset', uploadPreset);
                data.append('cloud_name', cloudName);

                // Make a POST request to Cloudinary's upload API
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    data
                );

                if (onChange) {
                    onChange(response.data.secure_url); // You can use 'secure_url' to display the uploaded image
                }
            } catch (error) {
                // Handle the error, e.g., display an error message to the user
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
            onClick={handleUploadClick}
        >
            <div>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    required
                    onChange={handleFileInputChange}
                />
                <TbPhotoPlus size={50} />
            </div>
            <div className="font-semibold text-lg">Click to upload</div>

            {value && (
                <div className="absolute inset-0 w-full h-full">
                    <img
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        src={value}
                        alt="Uploaded Image"
                    />
                </div>
            )}
        </div>
    );
};
ImageUpload.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
};
export default ImageUpload;

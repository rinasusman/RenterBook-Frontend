import React, { useEffect, useState } from 'react'
import Container from '../../Container'
import Heading from '../../Heading'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Button'
import userAxios from "../../../Axios/guestAxios";
import ImageUpload from '../inputs/ImageUpload'

const ListingEdit = () => {

    const location = useLocation();
    const { itemData } = location.state;
    console.log(itemData, "itemData:")
    const [title, setTitle] = useState(itemData.title);
    const [locations, setLocation] = useState(itemData.location);
    const [imageSrc, setImageValue] = useState(itemData.imageSrc)
    const [guestCount, setGuestCount] = useState(itemData.guestCount);
    const [roomCount, setRoomCount] = useState(itemData.roomCount);
    const [bathroomCount, setBathroomCount] = useState(itemData.bathroomCount);
    const [description, setDescription] = useState(itemData.description);
    const [price, setPrice] = useState(itemData.price);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState(itemData.imageUrl ? [itemData.imageUrl] : []);
    const [imageUrl, setImageUrl] = useState(itemData.imageUrl || []);
    const navigate = useNavigate()









    const handleUpdate = async () => {
        try {
            // Upload newly selected images
            const newImageUrls = await Promise.all(
                Array.from(selectedImages).map(async (image) => {
                    const formData = new FormData();
                    formData.append("file", image);
                    formData.append("upload_preset", "i9govbk0");
                    formData.append('cloud_name', "dxwljcjad");
    
                    const response = await fetch("https://api.cloudinary.com/v1_1/dxwljcjad/image/upload", {
                        method: "POST",
                        body: formData,
                    });
    
                    const data = await response.json();
                    return data.secure_url;
                })
            );
    
            // Combine existing and new image URLs
            const allImageUrls = [...imageUrl, ...newImageUrls];
    
            // Update state with combined image URLs
            setPreviewImages((prevImages) => [...prevImages, ...newImageUrls]);
    
            // Update the listing on the server with combined image URLs
            await userAxios.put(`/edithomes/${itemData._id}`, {
                title,
                locations,
                imageSrc,
                guestCount,
                roomCount,
                bathroomCount,
                description,
                price,
                imageUrls: allImageUrls,
            });
    
            navigate('/myproperties');
        } catch (error) {
            console.error('Error updating home:', error);
        }
    };
    
    
    // const handleRemoveImage = (index) => {
    //     // Remove the image at the specified index from the previewImages array
    //     setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // };
    const handleRemoveImage = (index) => {
        // Remove the image at the specified index from both selectedImages and previewImages arrays
        const updatedSelectedImages = Array.from(selectedImages).filter((_, i) => i !== index);
        setSelectedImages(updatedSelectedImages);

        setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const renderPreviewImages = () => {
        return Array.from(selectedImages).map((image, index) => (
            <div key={index} className="mr-2 mb-2 relative">
                <img className="w-[100px] h-[100px]" src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                <button
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                >
                    X
                </button>
            </div>
        ));
    };


    const handleRemoveoldImage = async (index) => {
        try {
            const updatedImageUrls = [...imageUrl];
            const removedImageUrl = updatedImageUrls.splice(index, 1)[0];

            // Make a request to your backend API to delete the image URL from MongoDB
            await userAxios.delete(`/deleteImage/${itemData._id}`, {
                data: { imageUrl: removedImageUrl },
            });

            // Update state to reflect the changes
            setImageUrl(updatedImageUrls);
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };


    return (
        <Container>
            <Heading
                title="Edit your Home"
                subtitle=""
            />


            <div className=' flex justify-center'>

                <div className='mt-10 flow flow-col-2'>
                    <div>
                        Title:
                    </div>

                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type=" text"
                        placeholder={itemData.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <hr />
                    <div>
                        Category:
                    </div>

                    <input

                        className="
                        border-2
                         rounded-sm 
                          w-[350px] 
                          p-3
                          "
                        type="text"
                        placeholder={itemData.category}

                    />
                    <div>
                        Place:
                    </div>
                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type="text"
                        placeholder={itemData.location}
                        value={locations}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <hr />
                    <div>Guest:</div>

                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "

                        type="text"
                        placeholder={itemData.guestCount}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                    />
                    <hr />
                    <div>Room:</div>

                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type="text"
                        placeholder={itemData.roomCount}
                        value={roomCount}
                        onChange={(e) => setRoomCount(e.target.value)}
                    />
                    <hr />
                    <div> Bathroom:</div>


                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type="text"
                        placeholder={itemData.bathroomCount}
                        value={bathroomCount}
                        onChange={(e) => setBathroomCount(e.target.value)}
                    />
                    <hr />
                    <div>Image:</div>

                    {/* <img
                        className="
                        w-[350px] 
                        h-[350px]
                        "
                        src={itemData.imageSrc}
                        alt="" /> */}
                    <ImageUpload
                        onChange={(value) => setImageValue(value)}
                        value={imageSrc}
                    />
                    <hr />

                    <div>
                        <div>Image URLs:</div>
                        <div className="flex flex-wrap">
                            {imageUrl.map((url, index) => (
                                <div key={index} className="relative inline-block">
                                    <img className="w-[100px] h-[100px] mr-2 mb-2" src={url} alt={`Image ${index}`} />
                                    <button
                                        onClick={() => handleRemoveoldImage(index)} // Add your remove image logic here
                                        className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div>Preview Images:</div>
                    <div className="flex flex-wrap">
                        <div className="flex flex-wrap">{renderPreviewImages()}</div>
                    </div>
                    <hr />
                    {/* <div>Selected Images:</div>
                    <div className="flex flex-wrap">{renderSelectedImages()}</div> */}
                    <hr />

                    <div> Add More Images:</div>

                    <input type="file" multiple onChange={(e) => setSelectedImages(e.target.files)} />
                    <hr />
                    <div>Description:</div>

                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type="text"
                        placeholder={itemData.description}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <hr />
                    <div>Price:</div>

                    <input
                        className="
                        border-2 
                        rounded-sm 
                        w-[350px] 
                        p-3
                        "
                        type="text"
                        placeholder={itemData.price}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />
                    <div
                        className='
                        w-[350px]
                         mt-3'>
                        <Button
                            onClick={() => {

                                handleUpdate();
                            }}
                            label=" Update"
                        />
                    </div>

                </div>
            </div>


        </Container >
    )
}

export default ListingEdit
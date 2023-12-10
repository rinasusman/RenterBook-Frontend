import React, { useState } from 'react'
import Container from '../../Container'
import Heading from '../../Heading'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Button'
import userAxios from "../../../Axios/guestAxios";
import ImageUpload from '../inputs/ImageUpload'

const ListingEdit = () => {

    const location = useLocation();
    const { itemData } = location.state;

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

    const navigate = useNavigate()









    const handleUpdate = async () => {
        try {
            const imageUrls = await Promise.all(
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
            setPreviewImages((prevImages) => [...prevImages, ...imageUrls]);

            await userAxios.put(`/edithomes/${itemData._id}`, {
                title,
                locations,
                imageSrc,
                guestCount,
                roomCount,
                bathroomCount,
                description,
                price,
                imageUrls: [...previewImages, ...imageUrls],
            });
            navigate('/myproperties')
        } catch (error) {
            console.error('Error updating home:', error);
        }
    };
    const handleRemoveImage = (index) => {
        // Remove the image at the specified index from the previewImages array
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

    // const renderSelectedImages = () => {
    //     return Array.from(selectedImages).map((image, index) => (
    //         <div key={index} className="mr-2 mb-2">
    //             <img className="w-[100px] h-[100px]" src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
    //             <button
    //                 className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer"
    //                 onClick={() => handleRemoveImage(index)}
    //             >
    //                 X
    //             </button>
    //         </div>
    //     ));
    // };
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
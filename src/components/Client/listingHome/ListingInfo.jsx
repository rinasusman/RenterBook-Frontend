import React from 'react'
import { IoMdChatbubbles } from "react-icons/io";
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createChat } from '../../../Api/ChatRequests';
import { useNavigate } from 'react-router-dom';
import useLoginModal from '../../../Hooks/useLoginModal';


const ListingInfo = ({ data }) => {
    console.log(data, "nameeeeeeeeeeeeeeeeee");
    if (!data) {
        return null;
    }
    const loginModal = useLoginModal();
    const hostName = data.userId.name || "Host's Name Not Available";
    const { userToken } = useSelector((state) => state.auth)
    const user = userToken && userToken.userdata ? userToken.userdata : null;
    const senderId = user ? user._id : "senderid not available";
    const receiverId = data.userId._id || "reciver's ID Not Available";
    const firstLetter = hostName ? hostName.charAt(0).toUpperCase() : "";
    const navigate = useNavigate()

    const handleChat = async (e) => {
        e.preventDefault()
        const payload = {
            senderId: senderId,
            receiverId: receiverId
        }


        try {
            if (user) {
                const datas = await createChat(payload);
                const chatData = datas.data;
                console.log(chatData, "chatdata:")
                if (chatData) {
                    navigate("/messages")
                }
                else {
                    console.log("error")
                }
            } else {
                loginModal.onOpen();
            }
        }
        catch
        {
            console.log("error")
        }
    }

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
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
                    <div className="flex items-center justify-center bg-rose-500 rounded-full w-[30px] h-[30px]">
                        <span className="font-semibold text-2xl text-white">{firstLetter}</span>

                    </div>
                    <div>Hosted by {hostName} </div>

                </div>
                <div className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
            "
                >
                    <div>
                        {data.guestCount} guests
                    </div>
                    <div>
                        {data.roomCount}  rooms
                    </div>
                    <div>
                        {data.bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />

            <div className='flex flex-row gap-3 cursor-pointer font-semibold items-center' onClick={handleChat}>
                <div className='bg-rose-500 p-1 rounded-full'>
                    <IoMdChatbubbles size={28} color='white' />
                </div>
                Chat with {hostName}
            </div>

            <hr />
            <div className="
        text-lg font-light text-neutral-500">
                {data.description
                }
            </div>
            <hr />
            {/* <Map center={coordinates} /> */}
        </div>
    )
}
ListingInfo.propTypes = {
    data: PropTypes.shape({
        userId: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
        }),
        guestCount: PropTypes.number,
        roomCount: PropTypes.number,
        bathroomCount: PropTypes.number,
        description: PropTypes.string,
    }),
};
export default ListingInfo
import React, { useEffect, useRef, useState } from 'react'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { getUser } from '../../../Api/UserRequests'
import { addMessage, getMessages } from '../../../Api/MessageRequests'
import PropTypes from 'prop-types';
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {

    const [messages, setMessages] = useState([]);
    const [userData, setUserData] = useState(null);
    const firstLetter = userData?.name ? userData?.name.charAt(0).toUpperCase() : "";
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);








    // Send Message
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        const receiverId = chat.members.find((id) => id !== currentUser);
        // // send message to socket server
        setSendMessage({ ...message, receiverId })
        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch
        {
            console.log("error")
        }
    }

    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // Scroll to the bottom when component mounts or when messages change
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    return (
        <>
            <div className='
                bg-white
                bg-opacity-60
                shadow-xl
                rounded-lg 
                grid 
                grid-rows-[14vh,60vh,13vh]
                '>
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div
                            className='
                         p-4 
                         flex 
                         flex-col
                         '>
                            <div className='
                            flex
                            justify-between
                            items-center
                            p-3
                            '>
                                <div className='flex flex-row items-center gap-2'>
                                    <div
                                        className="
                                        flex 
                                        items-center 
                                        justify-center 
                                        bg-rose-500 
                                        rounded-full  
                                        w-12 
                                         h-12 ">
                                        <span className="font-semibold text-2xl text-white">{firstLetter}</span>

                                    </div>
                                    <div
                                        className='
                                     flex
                                     flex-col
                                     justify-start
                                     items-center
                                      text-sm'
                                    >
                                        <span className='font-semibold'>{userData?.name}</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        {/* chat-body */}
                        <div ref={scroll} className='w-[875px] h-[380px] absolute top-[90px] overflow-y-scroll ' >
                            <div className='
                            flex
                            flex-col
                            gap-2
                            p-6
                            '
                            >
                                {messages.map((message) => (
                                    <>
                                        <div className={`message ${message.senderId === currentUser ? 'text-white p-2.5 rounded-br-[1rem] rounded-tr-[0] max-w-[28rem] w-auto flex flex-col gap-2 self-end rounded-bl-[1rem] rounded-tl-[1rem] bg-gradient-to-r from-sky-500 to-blue-500' : 'text-white p-2.5 rounded-br-[1rem] rounded-tr-[1rem] max-w-[28rem] w-auto flex flex-col gap-2 self-start rounded-bl-[1rem] rounded-tl-[0] bg-gradient-to-r  from-rose-500 to-red-500'}`}>
                                            <span>{message.text}</span>{" "}
                                            <span className='text-neutral-300 self-end text-xs'>{format(message.createdAt)}</span>
                                        </div>

                                    </>
                                ))}
                            </div >
                        </div >

                        {/* chat-sender */}
                        < div className="bg-white flex justify-start items-center gap-4 p-2 rounded-md self-start w-full mt-auto"

                        >
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div
                                className='flex items-center justify-center text-white border-none rounded-xl
                                bg-rose-500 transition-all duration-100 ease-out p-2 cursor-pointer'onClick={handleSend}>
                                Send
                            </div>
                        </div >
                    </>) : (
                    <span className="flex items-center justify-center">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div >
        </>
    )
}
ChatBox.propTypes = {
    chat: PropTypes.shape({
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
        _id: PropTypes.string.isRequired,
    }),
    currentUser: PropTypes.string.isRequired,
    setSendMessage: PropTypes.func.isRequired,
    receivedMessage: PropTypes.object,
};

export default ChatBox
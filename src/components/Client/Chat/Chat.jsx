import React, { useEffect, useRef, useState } from "react";
import Container from "../../Container";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";
import { userChats } from "../../../Api/ChatRequests";
import { io } from "socket.io-client";


const Chat = () => {

    const { userToken } = useSelector((state) => state.auth)
    const user = userToken && userToken.userdata ? userToken.userdata : null;
    const socket = useRef();
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    console.log(onlineUsers)

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id);
                setChats(data);
                console.log(data, "chaaaaaaaaaaaat")
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    useEffect(() => {
        socket.current = io("http://localhost:5000/");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
            console.log("Online users:", users);
        });
    }, [user]);


    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        console.log("Setting up recieve-message listener");
        socket.current.on("recieve-message", (data) => {
            console.log("Message received:", data);
            setReceivedMessage(data);
        }

        );
    }, []);

    return (
        <Container>
            <div className='
            relative
            grid 
            grid-cols-[25%,auto]
            gap-4
            '>
                {/* Left Side*/}
                <div className='
                flex
                flex-col
                gap-4
                '>
                    <div className='
                       flex 
                       flex-col
                       gap-4
                       bg-white
                       bg-opacity-60
                     
                       shadow-xl
                       rounded-xl
                       p-4 h-auto 
                       min-h-[80vh]
                       overflow-scroll
                    '>


                        <h1 className='font-semibold'>Chats</h1>
                        <div className='
                           flex 
                           flex-col 
                           gap-4
                           '>
                            {chats.map((chat) => (
                                <div key={chat && chat._id ? chat._id : 'fallbackId'}
                                    onClick={() => {
                                        setCurrentChat(chat && chat._id ? chat : null)
                                    }}
                                >
                                    <Conversation
                                        data={chat}
                                        currentUser={user._id}

                                    />
                                </div>
                            ))}



                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className='
                flex
                flex-col
                gap-4
                '>
                    <ChatBox
                        chat={currentChat}
                        currentUser={user._id}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                    />
                </div>

            </div>
        </Container >
    );
};

export default Chat;
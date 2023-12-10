import React, { useEffect, useState } from 'react'
import { getUser } from '../../../Api/UserRequests'
import PropTypes from 'prop-types';
const Conversation = ({ data, currentUser }) => {
    console.log(currentUser, "usercurrent:")
    const [userData, setUserData] = useState(null)

    console.log(userData, "name:")
    const firstLetter = userData?.name ? userData?.name.charAt(0).toUpperCase() : "";
    console.log(firstLetter, "nnnnnnn")
    useEffect(() => {

        const userId = data.members.find((id) => id !== currentUser)
        console.log(userId, "iddddd")
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data, "data:")
            }
            catch (error) {
                console.log(error)
            }
        }

        getUserData();
    }, [])
    return (
        <>
            <div className='
        flex
        flex-row
        justify-between
        items-center
        rounded-md
        p-4
        hover:bg-gray-300
         cursor-pointer
        '>
                <div className='flex flex-row  items-center gap-1'>

                    <div className="flex items-center justify-center bg-rose-500 rounded-full  w-12 
                 h-12 ">
                        <span className="font-semibold text-2xl text-white">{firstLetter}</span>

                    </div>

                    <div
                        className='
                    flex
                    flex-col
                    justify-start
                    items-center
                    text-sm
                    '
                    >
                        <span className='font-semibold'>{userData?.name}</span>

                    </div>
                </div>
            </div >
            <hr />

        </>
    )
}
Conversation.propTypes = {
    data: PropTypes.shape({
        members: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    currentUser: PropTypes.string.isRequired,
};

export default Conversation
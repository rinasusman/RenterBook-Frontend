import userAxios from '../Axios/guestAxios';




export const getUser = (userId) => userAxios.get(`/user/${userId}`);

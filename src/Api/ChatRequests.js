
import userAxios from '../Axios/guestAxios';



export const createChat = (datas) => userAxios.post('/createChat', datas);

export const userChats = (id) => userAxios.get(`/getchat/${id}`);

export const findChat = (firstId, secondId) => userAxios.get(`/find/${firstId}/${secondId}`);
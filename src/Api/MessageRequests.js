import userAxios from '../Axios/guestAxios';


export const getMessages = (id) => userAxios.get(`/getmessage/${id}`);


export const addMessage = (data) => userAxios.post('/addMessage/', data);
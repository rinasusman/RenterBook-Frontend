import adminAxios from '../Axios/adminAxios';

export const earningsDetails = () => adminAxios.get('/earnings');
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/admin' });


export const adminapiSlice = createApi({
    baseQuery,
    tagTypes: ['Admin'],
    endpoints: () => ({

    })
})
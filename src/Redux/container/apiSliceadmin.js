import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({ baseUrl: 'https://shoemee.shop/admin' });


export const adminapiSlice = createApi({
    baseQuery,
    tagTypes: ['Admin'],
    endpoints: () => ({

    })
})
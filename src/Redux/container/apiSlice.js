import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/' });
const baseQuery = fetchBaseQuery({ baseUrl: 'https://shoemee.shop/' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: () => ({

    })
})
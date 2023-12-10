import { adminapiSlice } from "./apiSliceadmin";

const ADMIN_URL = 'http://localhost:5000/admin'


export const adminApiSlice = adminapiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminlogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/adminlogin`,
                method: 'POST',
                body: data
            })
        }),
        adminlogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/adminlogout`,
                method: 'POST'
            })
        })
    })
})
export const { useAdminloginMutation, useAdminlogoutMutation } = adminApiSlice;
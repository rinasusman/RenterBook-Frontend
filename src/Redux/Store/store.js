import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../container/userAuth.slice';
import { apiSlice } from '../container/apiSlice'
import adminAuthReducer from '../container/adminAuth.slice';
import { adminapiSlice } from '../container/apiSliceadmin';
import searchReducer from '../container/searchSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        adminauth: adminAuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [adminapiSlice.reducerPath]: adminapiSlice.reducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(apiSlice.middleware),

    devTools: true
});



// adminAuth.slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  adminToken: localStorage.getItem('adminToken') ? JSON.parse(localStorage.getItem('adminToken')) : null
};

const adminAuthSlice = createSlice({
  name: 'adminauth',
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.adminToken = action.payload;
      localStorage.setItem('adminToken', JSON.stringify(action.payload));
    },
    setAdminLogout: (state) => {
      state.adminToken = null;
      localStorage.removeItem('adminToken');
    },
  },
});

export const { setAdminLogin, setAdminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;

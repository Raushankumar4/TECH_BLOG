import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  refresh: false,
  userProfile: null,
};

const userSlice = createSlice({
  name: "user", // name of the slice
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
}); // end of createSlice

export const { setUser, getRefresh, setUserProfile } = userSlice.actions;

export default userSlice.reducer;

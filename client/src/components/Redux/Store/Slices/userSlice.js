import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  refresh: false,
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
  },
}); // end of createSlice

export const { setUser, getRefresh } = userSlice.actions;

export default userSlice.reducer;

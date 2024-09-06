import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user", // name of the slice
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
}); // end of createSlice

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

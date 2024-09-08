import { createSlice } from "@reduxjs/toolkit";

const vlogSlice = createSlice({
  name: "vlog",
  initialState: {
    myVlogs: null,
    refresh: false,
  },
  reducers: {
    setMyVlogs: (state, action) => {
      state.myVlogs = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { setMyVlogs, getRefresh } = vlogSlice.actions;
export default vlogSlice.reducer;

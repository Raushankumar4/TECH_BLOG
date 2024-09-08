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
    deleteVlog: (state, action) => {
      const { id } = action.payload;
      state.myVlogs = state.myVlogs.filter((vlog) => vlog?._id !== id);
      state.refresh = !state.refresh;
    },
    updateVlog: (state, action) => {
      const updatedVlog = action.payload;
      state.myVlogs = state.myVlogs.map((vlog) =>
        vlog.id === updatedVlog.id ? updatedVlog : vlog
      );
      state.refresh = !state.refresh;
    },
  },
});

export const { setMyVlogs, getRefresh, deleteVlog, updateVlog } =
  vlogSlice.actions;
export default vlogSlice.reducer;

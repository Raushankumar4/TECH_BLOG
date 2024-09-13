import { createSlice } from "@reduxjs/toolkit";

const vlogSlice = createSlice({
  name: "vlog",
  initialState: {
    myVlogs: null,
    refresh: false,
    allVlogs: null,
    comments: null,
    savedVlogs: null,
  },
  reducers: {
    setMyVlogs: (state, action) => {
      state.myVlogs = action.payload;
    },
    setAllVlogs: (state, action) => {
      state.allVlogs = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setComment: (state, action) => {
      state.comments = action.payload;
    },

    deleteVlog: (state, action) => {
      const { id } = action.payload;

      state.myVlogs = state.myVlogs?.filter((vlog) => vlog?._id !== id) || null;

      state.allVlogs =
        state.allVlogs?.filter((vlog) => vlog?._id !== id) || null;

      state.refresh = !state.refresh;
    },
    updateVlog: (state, action) => {
      const updatedVlog = action.payload;

      state.myVlogs =
        state.myVlogs?.map((vlog) =>
          vlog?._id === updatedVlog.id ? updatedVlog : vlog
        ) || null;

      state.allVlogs =
        state.allVlogs?.map((vlog) =>
          vlog?._id === updatedVlog.id ? updatedVlog : vlog
        ) || null;

      state.refresh = !state.refresh;
    },
    setSavedVlogs: (state, action) => {
      state.savedVlogs = action.payload;
    },
  },
});

export const {
  setMyVlogs,
  setComment,
  setAllVlogs,
  getRefresh,
  deleteVlog,
  updateVlog,
  setSavedVlogs,
} = vlogSlice.actions;
export default vlogSlice.reducer;

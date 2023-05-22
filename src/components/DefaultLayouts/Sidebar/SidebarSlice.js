import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: {
    sidebarList: [],
    currentKey: {},
    urlFilter: "",
  },
  reducers: {
    setInitCurrentKey: (state, action) => {
      state.currentKey = action.payload;
    },
    setFilterList: (state, action) => {
      state.sidebarList = action.payload;
    },
    setCurrentKey: (state, action) => {
      const parentKey = action.payload.keyPath;
      let { [parentKey]: value } = state.currentKey;

      if (value === action.payload.key) {
        const newCurrentKey = {
          ...state.currentKey,
          [parentKey]: null,
        };
        state.currentKey = newCurrentKey;
        // not have key, push key to arr
      } else {
        const newCurrentKey = {
          ...state.currentKey,
          [parentKey]: action.payload.key,
        };

        state.currentKey = newCurrentKey;
        return state;
      }
    },
  },
});

const { reducer, actions } = sideBarSlice;
export const {
  setFilterList,
  setCurrentKey,
  getActivePage,
  setInitCurrentKey,
} = actions;
export default reducer;

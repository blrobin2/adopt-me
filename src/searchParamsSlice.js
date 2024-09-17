import { createSlice } from "@reduxjs/toolkit";

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
      page: 0,
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
  },
});

// const actions = counterSlice.actions;
// const increment = actions.increment;
// const decrement = actions.decrement;

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
